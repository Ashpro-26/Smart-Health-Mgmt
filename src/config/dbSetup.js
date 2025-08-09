import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const setupDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/healthcare-portal');
    console.log('Connected to MongoDB');

    // Create indexes
    await mongoose.connection.collection('users').createIndex({ email: 1 }, { unique: true });
    await mongoose.connection.collection('appointments').createIndex({ patientId: 1, date: 1 });
    await mongoose.connection.collection('prescriptions').createIndex({ patientId: 1, createdAt: -1 });
    await mongoose.connection.collection('medical_records').createIndex({ patientId: 1, date: -1 });

    console.log('Database indexes created successfully');

    // Create admin user if not exists
    const User = mongoose.model('User');
    const adminExists = await User.findOne({ role: 'admin' });
    
    if (!adminExists) {
      const adminUser = new User({
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@healthcare.com',
        password: 'admin123', // This will be hashed by the pre-save middleware
        role: 'admin',
        isActive: true
      });
      await adminUser.save();
      console.log('Admin user created successfully');
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Database setup failed:', error);
    throw error;
  }
};

export default setupDatabase; 