import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('careermind_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data)
};

export const jobAPI = {
  getAll: () => api.get('/jobs'),
  getById: (id) => api.get(`/jobs/${id}`),
  matchJob: (id, skills) => api.post(`/jobs/${id}/match`, { skills }),
  applyJob: (id) => api.post(`/jobs/${id}/apply`),
  createJob: (jobData) => api.post('/jobs', jobData)
};

export const resumeAPI = {
  analyze: (formData) => api.post('/resume/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
};

export const assessmentAPI = {
  generate: (skill, difficulty) => api.post('/assessments/generate', { skill, difficulty }),
  evaluate: (skill, difficulty, answers) => api.post('/assessments/evaluate', { skill, difficulty, answers }),
  getHistory: () => api.get('/assessments/history')
};

export const interviewAPI = {
  start: (targetRole) => api.post('/interviews/start', { targetRole }),
  evaluateTurn: (payload) => api.post('/interviews/evaluate-turn', payload),
  finish: (payload) => api.post('/interviews/finish', payload),
  getHistory: () => api.get('/interviews/history')
};

export const learningAPI = {
  getRoadmap: () => api.get('/learning/roadmap'),
  triggerFeedbackLoop: (payload) => api.post('/learning/trigger-feedback-loop', payload),
  completeMilestone: (payload) => api.post('/learning/complete-milestone', payload)
};

export const recruiterAPI = {
  getStats: () => api.get('/recruiter/stats'),
  updateCandidateStatus: (payload) => api.post('/recruiter/status', payload)
};

export default api;
