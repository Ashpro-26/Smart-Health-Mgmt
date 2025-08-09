import express from 'express';
import Appointment from '../models/Appointment.js';
import { protect as auth } from '../middleware/auth.js';

const router = express.Router();

// Create new appointment
router.post('/', auth, async (req, res) => {
  try {
    const { doctorName, specialization, date, time, location, phone, notes } = req.body;
    
    // Validate required fields
    if (!doctorName || !specialization || !date || !time || !location || !phone) {
      return res.status(400).json({ 
        success: false,
        message: 'Please provide all required fields' 
      });
    }

    // Validate date
    const appointmentDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (isNaN(appointmentDate.getTime())) {
      return res.status(400).json({ 
        success: false,
        message: 'Invalid date format' 
      });
    }

    if (appointmentDate < today) {
      return res.status(400).json({ 
        success: false,
        message: 'Appointment date cannot be in the past' 
      });
    }

    // Check for existing appointments on the same date and time
    const existingAppointment = await Appointment.findOne({
      userId: req.user._id,
      date: appointmentDate,
      time,
      status: { $ne: 'cancelled' }
    });

    if (existingAppointment) {
      return res.status(400).json({ 
        success: false,
        message: 'You already have an appointment scheduled for this date and time' 
      });
    }

    const appointment = new Appointment({
      userId: req.user._id,
      doctorName,
      specialty: specialization,
      date: appointmentDate,
      time,
      location,
      phone,
      notes,
      status: 'scheduled'
    });

    await appointment.save();
    
    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error creating appointment',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get user's appointments
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id })
      .sort({ date: 1 });
    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Error fetching appointments' });
  }
});

// Update appointment status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.status = status;
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    console.error('Error updating appointment:', error);
    res.status(500).json({ message: 'Error updating appointment' });
  }
});

export default router; 