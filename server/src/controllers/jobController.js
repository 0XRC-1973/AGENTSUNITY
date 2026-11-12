const db = require('../config/db');
const aiService = require('../services/aiService');

exports.getAllJobs = (req, res) => {
  const jobs = db.getAllJobs();
  return res.json({ jobs });
};

exports.getJobById = (req, res) => {
  const job = db.findJobById(req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  return res.json({ job });
};

exports.matchJob = async (req, res) => {
  try {
    const job = db.findJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const candidateSkills = req.user ? req.user.skills : (req.body.skills || {
      'Python': 91,
      'React': 61,
      'Node.js': 72,
      'DSA': 54,
      'SQL': 80,
      'MongoDB': 85,
      'Docker': 38,
      'AWS': 42
    });

    const matchResult = await aiService.matchJob(candidateSkills, job);
    return res.json({ match: matchResult });
  } catch (err) {
    console.error('Error matching job:', err);
    return res.status(500).json({ error: 'Failed to compute job match: ' + err.message });
  }
};

exports.applyJob = async (req, res) => {
  try {
    const job = db.findJobById(req.params.id);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const candidateId = req.user.id;
    const candidateSkills = req.user.skills;

    // Calculate match score
    const match = await aiService.matchJob(candidateSkills, job);

    const application = db.createApplication({
      jobId: job.id,
      candidateId,
      aiMatchScore: match.overallMatch,
      aiSummary: match.aiRecommendation
    });

    return res.status(201).json({
      message: 'Application submitted successfully with AI matching analysis.',
      application,
      match
    });
  } catch (err) {
    console.error('Error applying to job:', err);
    return res.status(500).json({ error: 'Failed to apply: ' + err.message });
  }
};

exports.createJob = (req, res) => {
  const { title, company, location, salary, description, requiredSkills, minExperience } = req.body;
  if (!title || !company || !description || !requiredSkills) {
    return res.status(400).json({ error: 'Title, company, description, and requiredSkills are required.' });
  }

  const job = db.createJob({
    recruiterId: req.user.id,
    title,
    company,
    location: location || 'Remote',
    salary: salary || 'Competitive',
    description,
    requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : requiredSkills.split(',').map(s => s.trim()),
    minExperience: minExperience || 1
  });

  return res.status(201).json({
    message: 'Job posted successfully',
    job
  });
};
