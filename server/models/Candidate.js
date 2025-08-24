import mongoose from 'mongoose';

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  noticePeriod: {
    type: Number,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  currentCTC: {
    type: String,
    required: true,
  },
  expectedCTC: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  resumeUrl: {
    type: String,
    required: true,
  },
  resumeFileName: {
    type: String,
    required: true,
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  status: {
    type: String,
    enum: ['applied', 'screening', 'interview', 'hired', 'rejected'],
    default: 'applied',
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Candidate', candidateSchema);