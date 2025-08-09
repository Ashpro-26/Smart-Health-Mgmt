import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['visit', 'procedure', 'test', 'vaccination'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  provider: {
    name: String,
    specialty: String
  },
  description: String,
  attachments: [{
    name: String,
    url: String,
    type: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('MedicalRecord', medicalRecordSchema); 