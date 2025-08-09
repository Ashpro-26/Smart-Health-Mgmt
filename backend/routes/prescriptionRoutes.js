import express from 'express';
import Prescription from '../models/Prescription.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Create new prescription
// @route   POST /api/prescriptions
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { medication, prescribedBy, startDate, endDate, refills, status, pharmacy, notes } = req.body;

    // Basic validation
    if (!medication || !medication.name || !medication.dosage || !medication.frequency || !prescribedBy || !prescribedBy.name || !startDate || !endDate) {
      return res.status(400).json({ message: 'Please enter all required fields for the prescription.' });
    }

    const prescription = new Prescription({
      userId: req.user._id, // Assuming userId is available from protect middleware
      medication,
      prescribedBy,
      startDate,
      endDate,
      refills,
      status,
      pharmacy,
      notes
    });

    const createdPrescription = await prescription.save();
    res.status(201).json(createdPrescription);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @desc    Get all prescriptions for a user
// @route   GET /api/prescriptions
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const prescriptions = await Prescription.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(prescriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router; 