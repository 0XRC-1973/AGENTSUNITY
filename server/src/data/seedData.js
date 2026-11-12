const bcrypt = require('bcryptjs');

const defaultPasswordHash = bcrypt.hashSync('password123', 10);

const seedUsers = [
  {
    id: 'user_student_01',
    email: 'student@careermind.ai',
    passwordHash: defaultPasswordHash,
    role: 'STUDENT',
    fullName: 'Aryan Sharma',
    headline: 'Aspiring Full Stack AI Engineer | B.Tech CSE Final Year',
    targetRole: 'Full Stack AI Engineer',
    skills: {
      'Python': 91,
      'React': 61,
      'Node.js': 72,
      'DSA': 54,
      'SQL': 80,
      'MongoDB': 85,
      'Docker': 38,
      'AWS': 42,
      'System Design': 40
    },
    jobReadiness: 74,
    createdAt: new Date().toISOString()
  },
  {
    id: 'user_recruiter_01',
    email: 'recruiter@techhire.ai',
    passwordHash: defaultPasswordHash,
    role: 'RECRUITER',
    fullName: 'Elena Rostova',
    headline: 'Senior Technical Talent Partner @ NeuraLink Innovations',
    company: 'NeuraLink Innovations',
    targetRole: 'Technical Recruiter',
    skills: {},
    jobReadiness: 100,
    createdAt: new Date().toISOString()
  }
];

const seedJobs = [
  {
    id: 'job_01',
    recruiterId: 'user_recruiter_01',
    title: 'Full Stack AI Engineer',
    company: 'NeuraLink Innovations',
    location: 'Bengaluru / Remote',
    salary: '₹18L - ₹28L PA',
    type: 'Full-Time',
    description: 'We are seeking an autonomous Full Stack AI Engineer to build scalable microservices, integrate LLM agents, and orchestrate containerized cloud pipelines. You will work with React, Node.js, Python, MongoDB, Docker, AWS, and modern System Design principles.',
    requiredSkills: ['Python', 'React', 'Node.js', 'MongoDB', 'Docker', 'AWS', 'System Design'],
    minExperience: 1,
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  },
  {
    id: 'job_02',
    recruiterId: 'user_recruiter_01',
    title: 'AI/ML Systems Engineer',
    company: 'DeepCognition AI',
    location: 'Hyderabad / Hybrid',
    salary: '₹22L - ₹34L PA',
    type: 'Full-Time',
    description: 'Architect deep learning pipelines, RAG systems, and high-throughput vector inference services using PyTorch, FastAPI, Docker, and Kubernetes.',
    requiredSkills: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'Machine Learning', 'NLP'],
    minExperience: 2,
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  },
  {
    id: 'job_03',
    recruiterId: 'user_recruiter_01',
    title: 'Frontend Platform Architect',
    company: 'CloudSphere Labs',
    location: 'Remote',
    salary: '₹16L - ₹24L PA',
    type: 'Full-Time',
    description: 'Lead modern UI development using React, TypeScript, state virtualization, and responsive design systems.',
    requiredSkills: ['React', 'JavaScript', 'TypeScript', 'HTML/CSS', 'Bootstrap/Tailwind'],
    minExperience: 1,
    status: 'ACTIVE',
    createdAt: new Date().toISOString()
  }
];

const seedApplications = [
  {
    id: 'app_01',
    jobId: 'job_01',
    candidateId: 'user_student_01',
    status: 'UNDER_REVIEW',
    aiMatchScore: 76,
    aiSummary: 'Strong proficiency in Python (91%) and MongoDB (85%). Primary gaps identified in Docker (38%) and AWS (42%). Candidate is currently engaged in autonomous remediation.',
    appliedAt: new Date().toISOString()
  }
];

module.exports = {
  seedUsers,
  seedJobs,
  seedApplications
};
