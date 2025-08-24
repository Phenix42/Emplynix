import express from 'express';
import Candidate from '../models/Candidate.js';
import { authenticateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import multer from 'multer'; // Add this import

const router = express.Router();

// Get all candidates (with optional jobId filter)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { jobId } = req.query;
    console.log('Fetching candidates, jobId filter:', jobId);
    const query = jobId ? { jobId } : {};
    const candidates = await Candidate.find(query)
      .populate('jobId', 'title company')
      .sort({ appliedDate: -1 });
    console.log('Fetched candidates:', candidates.length);
    res.json(candidates);
  } catch (error) {
    console.error('Error fetching candidates:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Submit job application (public route)
router.post('/apply', (req, res, next) => {
  upload.single('resume')(req, res, (err) => {
    if (err instanceof multer.MulterError) { // Use multer.MulterError
      return res.status(400).json({ message: 'File upload error', error: err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    console.log('Received job application:', req.body, req.file);
    const {
      name,
      email,
      contact,
      noticePeriod,
      experience,
      currentCTC,
      expectedCTC,
      qualification,
      jobId,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Resume is required' });
    }

    const candidateData = {
      name,
      email,
      contact,
      noticePeriod: Number(noticePeriod),
      experience: Number(experience),
      currentCTC,
      expectedCTC,
      qualification,
      resumeUrl: `/Uploads/${req.file.filename}`,
      resumeFileName: req.file.originalname,
      jobId,
      status: 'applied',
      appliedDate: new Date(),
    };

    console.log('Candidate data to save:', candidateData);
    const candidate = new Candidate(candidateData);
    await candidate.save();

    const populatedCandidate = await Candidate.findById(candidate._id).populate(
      'jobId',
      'title company'
    );
    console.log('Created candidate:', populatedCandidate);
    res.status(201).json({ message: 'Application submitted successfully', candidate: populatedCandidate });
  } catch (error) {
    console.error('Error submitting application:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', details: error.errors });
    }
    if (error.code === 'ENOENT') {
      return res.status(500).json({ message: 'Upload directory not found', error: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete candidate (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('Deleting candidate with ID:', req.params.id);
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }
    console.log('Deleted candidate:', candidate);
    res.json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;