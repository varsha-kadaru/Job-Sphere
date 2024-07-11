// models/JobApplicant.js
const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
  state: String,
  zip_code: String,
  country: String
});

const experienceSchema = new mongoose.Schema({
  company_name: String,
  job_title: String,
  start_date: Date,
  end_date: Date,
  description: String
});

const educationSchema = new mongoose.Schema({
  institution_name: String,
  degree: String,
  field_of_study: String,
  start_date: Date,
  end_date: Date
});

const jobApplicantSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  address: addressSchema,
  resume: String, // URL or path to the resume file
  cover_letter: String, // URL or path to the cover letter file
  skills: [String], // Array of skill strings
  experience: [experienceSchema],
  education: [educationSchema],
  password: { type: String, required: true },
  confirm_password: { type: String, required: true }
});

module.exports = mongoose.model('JobApplicant', jobApplicantSchema);
