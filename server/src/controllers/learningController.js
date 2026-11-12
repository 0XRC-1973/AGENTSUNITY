const aiService = require('../services/aiService');
const db = require('../config/db');

exports.getRoadmap = (req, res) => {
  const userId = req.user ? req.user.id : 'user_student_01';
  let roadmap = db.getRoadmap(userId);

  // If no roadmap exists yet, create default tailored one
  if (!roadmap) {
    roadmap = {
      targetRole: req.user ? req.user.targetRole : 'Full Stack AI Engineer',
      currentReadiness: req.user ? req.user.jobReadiness : 74,
      projectedReadiness: 95,
      skillGaps: ['Docker', 'AWS', 'System Design'],
      weeks: [
        {
          week: 1,
          title: 'Week 1: Docker Fundamentals & Multi-Stage Builds',
          topics: ['Docker Engine', 'Container Networking', 'Volume Mounts', 'Multi-stage optimization'],
          tasks: ['Containerize full-stack app', 'Optimize Dockerfile layer caching'],
          project: 'Containerized Microservice Suite',
          estimatedHours: 12,
          completed: false
        },
        {
          week: 2,
          title: 'Week 2: AWS Cloud Infrastructure & ECS Deployments',
          topics: ['IAM Roles', 'EC2 & S3 Buckets', 'ECS Container Orchestration', 'CloudWatch'],
          tasks: ['Provision S3 bucket with IAM policies', 'Deploy container to ECS Fargate'],
          project: 'Cloud Deployment Pipeline',
          estimatedHours: 14,
          completed: false
        },
        {
          week: 3,
          title: 'Week 3: High-Scale Distributed System Design',
          topics: ['Redis Caching', 'Horizontal Scaling & Load Balancing', 'Database Sharding'],
          tasks: ['Design distributed rate limiter with Redis Token Bucket', 'Implement cache-aside pattern'],
          project: 'High-Concurrency In-Memory Broker',
          estimatedHours: 14,
          completed: false
        },
        {
          week: 4,
          title: 'Week 4: Capstone AI Full Stack Integration & Proof',
          topics: ['End-to-End Orchestration', 'CI/CD Automation', 'Latency Optimization'],
          tasks: ['Deploy complete platform on container cluster', 'Pass automated stress test'],
          project: 'AGENTS UNITY Capstone Verification',
          estimatedHours: 16,
          completed: false
        }
      ]
    };
    db.saveRoadmap(userId, roadmap);
  }

  return res.json({ roadmap });
};

exports.triggerFeedbackLoop = async (req, res) => {
  try {
    const { targetRole, missingSkills, jobMatchScore } = req.body;
    const userId = req.user ? req.user.id : 'user_student_01';
    const currentSkills = req.user ? req.user.skills : {
      'Python': 91, 'React': 61, 'Node.js': 72, 'DSA': 54, 'SQL': 80, 'MongoDB': 85
    };

    const feedbackResult = await aiService.runFeedbackLoop({
      candidateId: userId,
      targetRole: targetRole || 'Full Stack AI Engineer',
      currentSkills,
      jobMatchScore: jobMatchScore || 72,
      missingSkills: missingSkills || ['Docker', 'AWS', 'System Design']
    });

    // Save generated curriculum to DB
    const roadmap = {
      targetRole: targetRole || 'Full Stack AI Engineer',
      currentReadiness: jobMatchScore || 72,
      projectedReadiness: feedbackResult.projectedMatchAfterRemediation || 95,
      skillGaps: feedbackResult.prioritizedGaps,
      weeks: feedbackResult.remediationWeeks.map(w => ({ ...w, completed: false }))
    };

    db.saveRoadmap(userId, roadmap);

    return res.json({
      success: true,
      message: feedbackResult.message,
      roadmap
    });
  } catch (err) {
    console.error('Error triggering feedback loop:', err);
    return res.status(500).json({ error: 'Failed to run career feedback loop: ' + err.message });
  }
};

exports.completeMilestone = (req, res) => {
  const { weekNumber, skillBoosted, boostPoints } = req.body;
  const userId = req.user ? req.user.id : 'user_student_01';
  const roadmap = db.getRoadmap(userId);

  if (!roadmap) {
    return res.status(404).json({ error: 'Roadmap not found.' });
  }

  const week = roadmap.weeks.find(w => w.week === Number(weekNumber));
  if (week) {
    week.completed = true;
  }

  // Update student skills & overall readiness
  if (req.user && skillBoosted) {
    const current = req.user.skills[skillBoosted] || 40;
    const updatedScore = Math.min(95, current + (boostPoints || 25));
    db.updateUserSkills(userId, { [skillBoosted]: updatedScore });
  }

  // Elevate current readiness towards projected
  roadmap.currentReadiness = Math.min(roadmap.projectedReadiness, roadmap.currentReadiness + 7);
  db.saveRoadmap(userId, roadmap);

  return res.json({
    message: `Milestone Week ${weekNumber} completed! Skill competency elevated.`,
    roadmap,
    updatedUser: req.user
  });
};
