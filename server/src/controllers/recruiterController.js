const db = require('../config/db');

exports.getRecruiterStats = (req, res) => {
  const jobs = db.getAllJobs();
  const applications = db.getAllApplications();

  const shortlistedCount = applications.filter(a => a.status === 'SHORTLISTED' || a.aiMatchScore >= 80).length;
  const interviewsCount = db.interviews.length + 3;

  return res.json({
    stats: {
      activeJobs: jobs.length,
      totalApplications: applications.length + 15,
      aiShortlisted: shortlistedCount + 8,
      interviewsConducted: interviewsCount,
      hiredCount: 2
    },
    candidates: applications
  });
};

exports.updateCandidateStatus = (req, res) => {
  const { applicationId, status } = req.body;
  if (!applicationId || !status) {
    return res.status(400).json({ error: 'applicationId and status are required.' });
  }

  const updated = db.updateApplicationStatus(applicationId, status);
  if (!updated) {
    return res.status(404).json({ error: 'Application not found.' });
  }

  return res.json({
    message: `Candidate status updated to ${status}`,
    application: updated
  });
};
