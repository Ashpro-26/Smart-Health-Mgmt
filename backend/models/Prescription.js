import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  medication: {
    name: {
      type: String,
      required: true
    },
    dosage: String,
    frequency: String,
    instructions: String
  },
  prescribedBy: {
    name: String,
    specialty: String
  },
  startDate: Date,
  endDate: Date,
  refills: {
    total: Number,
    remaining: Number
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },
  pharmacy: {
    name: String,
    address: String,
    phone: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Prescription', prescriptionSchema); 