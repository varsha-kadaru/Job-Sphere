// routes/jobApplications.js
const express = require('express');
const router = express.Router();
const JobApplication = require('../Models/Application');

// Create a new job application
router.post('/', async (req, res) => {
  try {
    const jobApplication = new JobApplication(req.body);
    await jobApplication.save();
    res.status(201).send(jobApplication);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all job applications
router.get('/', async (req, res) => {
  try {
    const jobApplications = await JobApplication.find().populate('user')
    res.send(jobApplications);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a job application by ID
router.get('/:id', async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id).populate('user');
    if (!jobApplication) {
      return res.status(404).send();
    }
    res.send(jobApplication);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all job applications for a specific job listing
router.get('/job/:jobId', async (req, res) => {
  try {
    const jobApplications = await JobApplication.find({ job_listing: req.params.jobId })
    if (!jobApplications || jobApplications.length === 0) {
      return res.status(404).send({ message: 'No job applications found for this job listing.' });
    }
    res.send(jobApplications);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all job applications by a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const jobApplications = await JobApplication.find({ user: req.params.userId }).populate('user').populate('job_listing');
    if (!jobApplications || jobApplications.length === 0) {
      return res.status(404).send({ message: 'No job applications found for this user.' });
    }
    res.send(jobApplications);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a job application by ID
router.patch('/:id', async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!jobApplication) {
      return res.status(404).send();
    }
    res.send(jobApplication);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update the status of a job application by ID
router.patch('/:id/status', async (req, res) => {
  try {
    const jobApplication = await JobApplication.findById(req.params.id);
    if (!jobApplication) {
      return res.status(404).send();
    }
    jobApplication.status = req.body.status;
    await jobApplication.save();
    res.send(jobApplication);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a job application by ID
router.delete('/:id', async (req, res) => {
  try {
    const jobApplication = await JobApplication.findByIdAndDelete(req.params.id);
    if (!jobApplication) {
      return res.status(404).send();
    }
    res.send(jobApplication);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
