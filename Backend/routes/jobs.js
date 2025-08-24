import express from 'express';
import Job from '../models/Job.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all jobs');
    const jobs = await Job.find().populate('postedBy', 'name email').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create job (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('Received job creation request:', req.body);
    console.log('User from token:', req.user);
    const jobData = {
      ...req.body,
      postedBy: req.user.userId,
    };
    console.log('Job data to save:', jobData);
    const job = new Job(jobData);
    await job.save();
    const populatedJob = await Job.findById(job._id).populate('postedBy', 'name email');
    console.log('Created job:', populatedJob);
    res.status(201).json(populatedJob);
  } catch (error) {
    console.error('Error creating job:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: error.errors });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update job (admin only)
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`Updating job with ID: ${req.params.id}`, req.body);
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('postedBy', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Updated job:', job);
    res.json(job);
  } catch (error) {
    console.error('Error updating job:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: error.errors });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete job (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log(`Deleting job with ID: ${req.params.id}`);
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Deleted job:', job);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;