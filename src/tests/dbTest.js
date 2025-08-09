import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Appointment from '../models/Appointment.js';
import Prescription from '../models/Prescription.js';
import MedicalRecord from '../models/MedicalRecord.js';

dotenv.config();

const testDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthcare-portal');
    console.log('Connected to MongoDB');

    // Test User Creation
    console.log('\nTesting User Creation...');
    const testUser = new User({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'test123',
      role: 'patient',
      phone: '1234567890'
    });
    await testUser.save();
    console.log('Test user created successfully');

    // Test Appointment Creation
    console.log('\nTesting Appointment Creation...');
    const testAppointment = new Appointment({
      patientId: testUser._id,
      doctorId: testUser._id, // Using same user for testing
      date: new Date(),
      time: '10:00 AM',
      type: 'checkup',
      status: 'scheduled'
    });
    await testAppointment.save();
    console.log('Test appointment created successfully');

    // Test Prescription Creation
    console.log('\nTesting Prescription Creation...');
    const testPrescription = new Prescription({
      patientId: testUser._id,
      doctorId: testUser._id,
      appointmentId: testAppointment._id,
      diagnosis: 'Test Diagnosis',
      medications: [{
        name: 'Test Medicine',
        dosage: '1 tablet',
        frequency: 'Once daily',
        duration: '7 days',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }],
      prescribedBy: {
        name: 'Test Doctor',
        specialty: 'General Medicine'
      }
    });
    await testPrescription.save();
    console.log('Test prescription created successfully');

    // Test Medical Record Creation
    console.log('\nTesting Medical Record Creation...');
    const testRecord = new MedicalRecord({
      patientId: testUser._id,
      doctorId: testUser._id,
      appointmentId: testAppointment._id,
      type: 'lab_result',
      title: 'Test Lab Result',
      description: 'Test Description',
      date: new Date(),
      provider: 'Test Lab'
    });
    await testRecord.save();
    console.log('Test medical record created successfully');

    // Test Data Retrieval
    console.log('\nTesting Data Retrieval...');
    const user = await User.findOne({ email: 'test@example.com' });
    console.log('Found user:', user.firstName, user.lastName);

    const appointment = await Appointment.findOne({ patientId: user._id });
    console.log('Found appointment:', appointment.type);

    const prescription = await Prescription.findOne({ patientId: user._id });
    console.log('Found prescription:', prescription.diagnosis);

    const record = await MedicalRecord.findOne({ patientId: user._id });
    console.log('Found medical record:', record.title);

    // Cleanup test data
    console.log('\nCleaning up test data...');
    await User.deleteOne({ email: 'test@example.com' });
    console.log('Test data cleaned up successfully');

    console.log('\nAll database tests completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Database test failed:', error);
    process.exit(1);
  }
};

testDatabase(); 