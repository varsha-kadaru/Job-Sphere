// models/JobListing.js
const mongoose = require('mongoose');

const jobListingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  salary_range: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  company: { type: String, required: true },
  posted_date: { type: Date, default: Date.now },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  requirements: [String], // Array of strings representing job requirements
  benefits: [String] // Array of strings representing job benefits
});

module.exports = mongoose.model('JobListing', jobListingSchema);
