// routes/recruiters.js
const express = require('express');
const router = express.Router();
const Recruiter = require('../Models/Recruiter');

// Create a new recruiter
const bcrypt = require('bcryptjs');

router.post('/', async (req, res) => {
  const { first_name, last_name, email, phone, company, position, password, confirm_password } = req.body;

  try {
    // Check if the passwords match
    if (password !== confirm_password) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Check if the recruiter already exists
    let existingRecruiter = await Recruiter.findOne({ email });
    if (existingRecruiter) {
      return res.status(400).json({ message: "Recruiter already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new recruiter object
    const newRecruiter = new Recruiter({
      first_name,
      last_name,
      email,
      phone,
      company,
      position,
      password: hashedPassword, // password is hashed
      confirm_password // confirm_password should be assigned here
    });

    // Save the recruiter to the database
    await newRecruiter.save();
    
    res.status(201).json({ message: "Recruiter registered successfully." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error." });
  }
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the recruiter exists
      const recruiter = await Recruiter.findOne({ email });
      if (!recruiter) {
        return res.status(404).json({ message: "Recruiter not found." });
      }
  
      // Check if the password is correct
      const isMatch = await bcrypt.compare(password, recruiter.password);
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

// Get all recruiters
router.get('/', async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.send(recruiters);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a recruiter by ID
router.get('/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).send();
    }
    res.send(recruiter);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a recruiter by ID
router.patch('/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!recruiter) {
      return res.status(404).send();
    }
    res.send(recruiter);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a recruiter by ID
router.delete('/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!recruiter) {
      return res.status(404).send();
    }
    res.send(recruiter);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
