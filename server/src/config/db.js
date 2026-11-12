const { seedUsers, seedJobs, seedApplications } = require('../data/seedData');

class DataStore {
  constructor() {
    this.users = [...seedUsers];
    this.jobs = [...seedJobs];
    this.applications = [...seedApplications];
    this.assessments = [];
    this.resumes = [];
    this.roadmaps = {};
    this.interviews = [];
  }

  // --- Users ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      skills: userData.skills || {
        'Python': 70,
        'JavaScript': 65,
        'React': 55,
        'SQL': 60
      },
      jobReadiness: 65,
      ...userData
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUserSkills(userId, newSkills) {
    const user = this.findUserById(userId);
    if (user) {
      user.skills = { ...user.skills, ...newSkills };
      // Recalculate average readiness
      const vals = Object.values(user.skills);
      if (vals.length > 0) {
        user.jobReadiness = Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
      }
      return user;
    }
    return null;
  }

  // --- Jobs ---
  getAllJobs() {
    return this.jobs;
  }

  findJobById(id) {
    return this.jobs.find(j => j.id === id);
  }

  createJob(jobData) {
    const newJob = {
      id: `job_${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'ACTIVE',
      ...jobData
    };
    this.jobs.unshift(newJob);
    return newJob;
  }

  // --- Applications ---
  getApplicationsByCandidate(candidateId) {
    return this.applications.filter(a => a.candidateId === candidateId);
  }

  getApplicationsByJob(jobId) {
    return this.applications.filter(a => a.jobId === jobId);
  }

  getAllApplications() {
    return this.applications.map(app => {
      const job = this.findJobById(app.jobId);
      const candidate = this.findUserById(app.candidateId);
      return {
        ...app,
        jobTitle: job ? job.title : 'Software Engineer',
        company: job ? job.company : 'Tech Corp',
        candidateName: candidate ? candidate.fullName : 'Candidate',
        candidateEmail: candidate ? candidate.email : 'candidate@test.com'
      };
    });
  }

  createApplication(appData) {
    const newApp = {
      id: `app_${Date.now()}`,
      appliedAt: new Date().toISOString(),
      status: 'APPLIED',
      ...appData
    };
    this.applications.unshift(newApp);
    return newApp;
  }

  updateApplicationStatus(appId, status) {
    const app = this.applications.find(a => a.id === appId);
    if (app) {
      app.status = status;
      return app;
    }
    return null;
  }

  // --- Roadmaps & Closed Loop ---
  saveRoadmap(userId, roadmap) {
    this.roadmaps[userId] = roadmap;
    return roadmap;
  }

  getRoadmap(userId) {
    return this.roadmaps[userId] || null;
  }

  // --- Assessments ---
  saveAssessment(result) {
    this.assessments.push({
      id: `assess_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...result
    });
  }

  getAssessmentsByUser(userId) {
    return this.assessments.filter(a => a.userId === userId);
  }

  // --- Interview Sessions ---
  saveInterview(interviewData) {
    const item = {
      id: `int_${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...interviewData
    };
    this.interviews.push(item);
    return item;
  }

  getInterviewsByUser(userId) {
    return this.interviews.filter(i => i.userId === userId);
  }
}

const db = new DataStore();
module.exports = db;
