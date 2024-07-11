// models/Recruiter.js
const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  company: { type: String, required: true },
  position: String,
  job_listings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }], // Assuming you have a JobListing model
  password: { type: String, required: true },
  confirm_password: { type: String, required: true }
});

module.exports = mongoose.model('Recruiter', recruiterSchema);
