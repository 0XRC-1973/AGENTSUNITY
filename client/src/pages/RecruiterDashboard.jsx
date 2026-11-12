import React, { useState, useEffect } from 'react';
import { recruiterAPI, jobAPI } from '../services/api';
import { 
  Users, 
  Briefcase, 
  CheckCircle2, 
  Sparkles, 
  Search, 
  Plus, 
  Award, 
  Filter,
  Eye,
  Check,
  Clock
} from 'lucide-react';

export default function RecruiterDashboard() {
  const [stats, setStats] = useState({
    activeJobs: 3,
    totalApplications: 24,
    aiShortlisted: 9,
    interviewsConducted: 8,
    hiredCount: 2
  });

  const [candidates, setCandidates] = useState([
    {
      id: 'c1',
      candidateName: 'Aryan Sharma',
      candidateEmail: 'student@careermind.ai',
      jobTitle: 'Full Stack AI Engineer',
      aiMatchScore: 92,
      skillsScore: 88,
      interviewScore: 84,
      status: 'SHORTLISTED'
    },
    {
      id: 'c2',
      candidateName: 'Priya Patel',
      candidateEmail: 'priya.p@gmail.com',
      jobTitle: 'AI/ML Systems Engineer',
      aiMatchScore: 87,
      skillsScore: 83,
      interviewScore: 81,
      status: 'REVIEW'
    },
    {
      id: 'c3',
      candidateName: 'Rohan Verma',
      candidateEmail: 'rohan.v@outlook.com',
      jobTitle: 'Frontend Platform Architect',
      aiMatchScore: 71,
      skillsScore: 74,
      interviewScore: 68,
      status: 'HOLD'
    },
    {
      id: 'c4',
      candidateName: 'Neha Kapoor',
      candidateEmail: 'neha.k@yahoo.com',
      jobTitle: 'Full Stack AI Engineer',
      aiMatchScore: 94,
      skillsScore: 91,
      interviewScore: 88,
      status: 'SHORTLISTED'
    }
  ]);

  const [showPostModal, setShowPostModal] = useState(false);
  const [filterThreshold, setFilterThreshold] = useState(0);
  const [newJob, setNewJob] = useState({
    title: '',
    company: 'NeuraLink Innovations',
    location: 'Bengaluru / Remote',
    salary: '₹20L - ₹32L PA',
    description: '',
    requiredSkills: ''
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await recruiterAPI.getStats();
      if (res.data.stats) setStats(res.data.stats);
      if (res.data.candidates && res.data.candidates.length > 0) {
        setCandidates(res.data.candidates.map(candidate => ({
          ...candidate,
          skillsScore: candidate.skillsScore || candidate.aiMatchScore,
          interviewScore: candidate.interviewScore || candidate.aiMatchScore,
          status: candidate.status === 'UNDER_REVIEW' ? 'REVIEW' : candidate.status
        })));
      }
    } catch (e) {
      console.warn('Using seeded recruiter metrics:', e);
    }
  };

  const handleStatusChange = async (candidateId, newStatus) => {
    setCandidates(prev => prev.map(c => c.id === candidateId ? { ...c, status: newStatus } : c));
    try {
      await recruiterAPI.updateCandidateStatus({ applicationId: candidateId, status: newStatus });
    } catch (e) {
      console.warn('Status updated locally:', e);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await jobAPI.createJob({
        ...newJob,
        requiredSkills: newJob.requiredSkills.split(',').map(s => s.trim())
      });
      setShowPostModal(false);
      setStats(prev => ({ ...prev, activeJobs: prev.activeJobs + 1 }));
      alert('Job successfully posted and indexed for AI candidate matching!');
    } catch (e) {
      console.error(e);
    }
  };

  const filteredCandidates = candidates.filter(c => c.aiMatchScore >= filterThreshold);

  return (
    <div className="recruiter-dashboard py-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <span className="badge-agent mb-1">Recruiter Intelligence Studio</span>
            <h2 className="text-white fw-bold mb-0">Talent Acquisition & AI Shortlisting</h2>
            <p className="text-secondary small mb-0">
              Autonomous candidate ranking based on multi-agent evaluation, verified projects, and ATS benchmarks.
            </p>
          </div>

          <button 
            onClick={() => setShowPostModal(true)}
            className="btn-gradient d-flex align-items-center gap-2"
          >
            <Plus size={16} />
            <span>Post New Opportunity</span>
          </button>
        </div>

        {/* 5 Stats Metric Tiles */}
        <div className="row g-3 mb-4">
          <div className="col">
            <div className="glass-card p-3 text-center">
              <span className="text-secondary small d-block mb-1">Active Positions</span>
              <h3 className="text-white fw-bold mb-0">{stats.activeJobs}</h3>
            </div>
          </div>
          <div className="col">
            <div className="glass-card p-3 text-center">
              <span className="text-secondary small d-block mb-1">Total Applicants</span>
              <h3 className="text-white fw-bold mb-0">{stats.totalApplications}</h3>
            </div>
          </div>
          <div className="col">
            <div className="glass-card p-3 text-center" style={{ border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <span className="text-secondary small d-block mb-1">AI Shortlisted</span>
              <h3 className="text-success fw-bold mb-0">{stats.aiShortlisted}</h3>
            </div>
          </div>
          <div className="col">
            <div className="glass-card p-3 text-center">
              <span className="text-secondary small d-block mb-1">Interviews</span>
              <h3 className="text-info fw-bold mb-0">{stats.interviewsConducted}</h3>
            </div>
          </div>
          <div className="col">
            <div className="glass-card p-3 text-center">
              <span className="text-secondary small d-block mb-1">Hired</span>
              <h3 className="text-warning fw-bold mb-0">{stats.hiredCount}</h3>
            </div>
          </div>
        </div>

        {/* Candidate Ranking Table */}
        <div className="glass-card p-4">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-3 border-bottom pb-3" style={{ borderColor: 'var(--border-color)' }}>
            <h5 className="text-white fw-bold mb-0 d-flex align-items-center gap-2">
              <Award size={20} color="#6366f1" />
              Candidate Intelligence Pool (AI Ranked)
            </h5>

            {/* Filter buttons */}
            <div className="d-flex align-items-center gap-2">
              <Filter size={16} color="#94a3b8" />
              <button 
                onClick={() => setFilterThreshold(0)}
                className={`btn btn-sm ${filterThreshold === 0 ? 'btn-gradient' : 'btn-glass'} py-1 px-2`}
                style={{ fontSize: '0.75rem' }}
              >
                All Candidates
              </button>
              <button 
                onClick={() => setFilterThreshold(85)}
                className={`btn btn-sm ${filterThreshold === 85 ? 'btn-gradient' : 'btn-glass'} py-1 px-2`}
                style={{ fontSize: '0.75rem' }}
              >
                Match &gt; 85%
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-dark table-hover mb-0" style={{ background: 'transparent' }}>
              <thead>
                <tr className="text-secondary small" style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <th>CANDIDATE</th>
                  <th>ROLE</th>
                  <th>AI MATCH</th>
                  <th>SKILLS PROFICIENCY</th>
                  <th>INTERVIEW SCORE</th>
                  <th>STATUS</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {filteredCandidates.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td>
                      <div className="fw-bold text-white">{c.candidateName}</div>
                      <small className="text-secondary">{c.candidateEmail}</small>
                    </td>
                    <td>
                      <span className="small text-light">{c.jobTitle}</span>
                    </td>
                    <td>
                      <span className="badge-success-glass fs-6 px-3 py-1">
                        ⭐ {c.aiMatchScore}%
                      </span>
                    </td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <span className="small text-white fw-semibold">{c.skillsScore}%</span>
                        <div className="progress-container flex-grow-1" style={{ width: '60px' }}>
                          <div className="progress-bar-fill" style={{ width: `${c.skillsScore}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="small text-info fw-semibold">{c.interviewScore}%</span>
                    </td>
                    <td>
                      <span className={`badge ${
                        c.status === 'SHORTLISTED' ? 'bg-success' : (c.status === 'REVIEW' ? 'bg-primary' : 'bg-secondary')
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="form-select form-select-sm form-control-dark"
                        value={c.status}
                        onChange={(e) => handleStatusChange(c.id, e.target.value)}
                        style={{ width: '130px', fontSize: '0.75rem' }}
                      >
                        <option value="SHORTLISTED">Shortlist</option>
                        <option value="REVIEW">Review</option>
                        <option value="HOLD">Hold</option>
                        <option value="HIRED">Hire</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Post Job Modal */}
        {showPostModal && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', zIndex: 1050 }}>
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content glass-card p-3">
                <div className="modal-header border-0">
                  <h5 className="modal-title text-white fw-bold">Post New Opportunity</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setShowPostModal(false)}></button>
                </div>
                <form onSubmit={handleCreateJob}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label text-secondary small">Job Title</label>
                      <input 
                        type="text"
                        className="form-control form-control-dark"
                        placeholder="e.g., Senior Full Stack AI Engineer"
                        value={newJob.title}
                        onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="row g-3 mb-3">
                      <div className="col-md-6">
                        <label className="form-label text-secondary small">Company</label>
                        <input 
                          type="text"
                          className="form-control form-control-dark"
                          value={newJob.company}
                          onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label text-secondary small">Location</label>
                        <input 
                          type="text"
                          className="form-control form-control-dark"
                          value={newJob.location}
                          onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-secondary small">Required Skills (Comma separated)</label>
                      <input 
                        type="text"
                        className="form-control form-control-dark"
                        placeholder="Python, React, Node.js, Docker, AWS, System Design"
                        value={newJob.requiredSkills}
                        onChange={(e) => setNewJob({ ...newJob, requiredSkills: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label text-secondary small">Job Description</label>
                      <textarea 
                        className="form-control form-control-dark"
                        rows="3"
                        placeholder="Describe expectations, core responsibilities, and architecture..."
                        value={newJob.description}
                        onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer border-0">
                    <button type="button" className="btn-glass" onClick={() => setShowPostModal(false)}>Cancel</button>
                    <button type="submit" className="btn-gradient">Publish Job & Index with AI</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
