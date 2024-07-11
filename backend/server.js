const express = require('express');
const mongoose = require('mongoose');
const jobApplicantRoutes = require('./Routes/jobApplicants');
const jobApplicationRoutes = require('./Routes/jobApplication');
const recruiterRoutes = require('./Routes/recruiters');
const jobListingRoutes = require('./Routes/jobListings');
const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/jobAppportal', {
  
});

app.use(express.json());
app.use('/api/job-applications', jobApplicationRoutes);
app.use('/api/job-applicants', jobApplicantRoutes);
app.use('/api/recruiters', recruiterRoutes);
app.use('/api/job-listings', jobListingRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
