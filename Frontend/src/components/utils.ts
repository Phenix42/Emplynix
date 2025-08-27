// utils.ts
import { Job } from '../types/Job';

export const mapToFullJob = (job: Partial<Job>): Job => ({
  _id: job._id || job._id?.toString() || '',
  title: job.title || '',
  company: job.company || '',
  location: job.location || '',
  type: job.type || 'Full-time',
  salary: job.salary || '',
  experience: job.experience || '',
  description: job.description || '',
  requirements: job.requirements || [],
  benefits: job.benefits || [],
  status: job.status || 'active',
  createdAt: job.createdAt || new Date().toISOString(),
});
