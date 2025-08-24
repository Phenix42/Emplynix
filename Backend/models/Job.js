import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true, enum: ['Full-time', 'Part-time', 'Contract', 'Remote'] },
  salary: { type: String },
  experience: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  benefits: [{ type: String }],
  status: { type: String, required: true, enum: ['active', 'inactive', 'closed'], default: 'active' },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  applicationCount: { type: Number, default: 0 },
});

export default mongoose.model('Job', jobSchema);