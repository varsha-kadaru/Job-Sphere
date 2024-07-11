// models/JobApplication.js
const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'JobApplicant', required: true },
  job_listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  resume: { type: String },
  application_date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: [
      "applied",
      "shortlisted",
      "accepted",
      "rejected",
      "deleted",
      "cancelled",
      "finished"
    ],
    default: "applied",
    required: true
  }
});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
