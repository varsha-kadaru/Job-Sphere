// routes/jobListings.js
const express = require('express');
const router = express.Router();
const JobListing = require('../Models/Job');

// Create a new job listing
router.post('/', async (req, res) => {
  try {
    const jobListing = new JobListing(req.body);
    await jobListing.save();
    res.status(201).send(jobListing);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all job listings
router.get('/', async (req, res) => {
  try {
    const jobListings = await JobListing.find().populate('recruiter');
    res.send(jobListings);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/recruiter/:recruiterId', async (req, res) => {
  try {
    const jobListings = await JobListing.find({ recruiter: req.params.recruiterId }).populate('recruiter');
    if (!jobListings || jobListings.length === 0) {
      return res.status(404).send({ message: 'No job listings found for this recruiter.' });
    }
    res.send(jobListings);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a job listing by ID
router.get('/:id', async (req, res) => {
  try {
    const jobListing = await JobListing.findById(req.params.id).populate('recruiter');
    if (!jobListing) {
      return res.status(404).send();
    }
    res.send(jobListing);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a job listing by ID
router.patch('/:id', async (req, res) => {
  try {
    const jobListing = await JobListing.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!jobListing) {
      return res.status(404).send();
    }
    res.send(jobListing);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a job listing by ID
router.delete('/:id', async (req, res) => {
  try {
    const jobListing = await JobListing.findByIdAndDelete(req.params.id);
    if (!jobListing) {
      return res.status(404).send();
    }
    res.send(jobListing);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
