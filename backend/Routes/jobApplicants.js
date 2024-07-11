// routes/jobApplicants.js
const express = require('express');
const router = express.Router();
const JobApplicant = require('../Models/JobApplicant');
const bcrypt = require('bcryptjs');
// Create a new job applicant
router.post('/', async (req, res) => {
  const { first_name, last_name, email, phone, address, resume, cover_letter, skills, experience, education, password, confirm_password } = req.body;

  try {
    // Check if the passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Check if the job applicant already exists
    let existingApplicant = await JobApplicant.findOne({ email });
    if (existingApplicant) {
      return res.status(400).json({ message: "Job applicant already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new job applicant object
    const newApplicant = new JobApplicant({
      first_name,
      last_name,
      email,
      phone,
      address,
      resume,
      cover_letter,
      skills,
      experience,
      education,
      password: hashedPassword,
      confirm_password
    });

    // Save the job applicant to the database
    await newApplicant.save();
    
    res.status(201).json({ message: "Job applicant registered successfully." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
});

// Login route for job applicants
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the job applicant exists
    const applicant = await JobApplicant.findOne({ email });
    if (!applicant) {
      return res.status(404).json({ message: "Job applicant not found." });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, applicant.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Return a token, session, or other identification method as needed
    // For simplicity, let's just return a success message
    res.status(200).json({ message: "Login successful." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
});

module.exports = router;



// Get all job applicants
router.get('/', async (req, res) => {
  try {
    const jobApplicants = await JobApplicant.find();
    res.send(jobApplicants);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a job applicant by ID
router.get('/:id', async (req, res) => {
  try {
    const jobApplicant = await JobApplicant.findById(req.params.id);
    if (!jobApplicant) {
      return res.status(404).send();
    }
    res.send(jobApplicant);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a job applicant by ID
router.patch('/:id', async (req, res) => {
  try {
    const jobApplicant = await JobApplicant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!jobApplicant) {
      return res.status(404).send();
    }
    res.send(jobApplicant);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a job applicant by ID
router.delete('/:id', async (req, res) => {
  try {
    const jobApplicant = await JobApplicant.findByIdAndDelete(req.params.id);
    if (!jobApplicant) {
      return res.status(404).send();
    }
    res.send(jobApplicant);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
