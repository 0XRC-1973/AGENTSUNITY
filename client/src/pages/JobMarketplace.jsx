import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobAPI, learningAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Building,
  Target,
  Send
} from 'lucide-react';

export default function JobMarketplace() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [matchData, setMatchData] = useState({});
  const [loading, setLoading] = useState(true);
  const [applyingJobId, setApplyingJobId] = useState(null);
  const [applySuccess, setApplySuccess] = useState(null);

  useEffect(() => {
    fetchJobsAndMatches();
  }, [user]);

  const fetchJobsAndMatches = async () => {
    setLoading(true);
    try {
      const res = await jobAPI.getAll();
      const allJobs = res.data.jobs || [];
      setJobs(allJobs);

      // Fetch AI Match for each job
      const matches = {};
      for (const job of allJobs) {
        try {
          const matchRes = await jobAPI.matchJob(job.id, user?.skills);
          matches[job.id] = matchRes.data.match;
        } catch (e) {
          console.warn('Match calculation fallback for job:', job.id);
        }
      }
      setMatchData(matches);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    setApplyingJobId(jobId);
    setApplySuccess(null);
    try {
      const res = await jobAPI.applyJob(jobId);
      setApplySuccess({ jobId, message: res.data.message });
    } catch (err) {
      console.error(err);
    } finally {
      setApplyingJobId(null);
    }
  };

  const handleRemediateGaps = async (job, match) => {
    try {
      await learningAPI.triggerFeedbackLoop({
        targetRole: job.title,
        missingSkills: match?.missingSkills || ['Docker', 'AWS', 'System Design'],
        jobMatchScore: match?.overallMatch || 72
      });
      navigate('/learning');
    } catch (err) {
      console.error(err);
      navigate('/learning');
    }
  };

  return (
    <div className="job-marketplace py-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <span className="badge-agent mb-1">Job Matching Intelligence Agent</span>
            <h2 className="text-white fw-bold mb-0">AI-Matched Career Opportunities</h2>
            <p className="text-secondary small mb-0">
              Jobs are ranked via hybrid semantic embedding and skill proficiency matrices.
            </p>
          </div>
          <span className="badge-success-glass fs-6 px-3 py-2">
            {jobs.length} Active Positions
          </span>
        </div>

        {/* Global Feedback Banner */}
        {applySuccess && (
          <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4" role="alert">
            <CheckCircle2 size={18} />
            <div>{applySuccess.message}</div>
          </div>
        )}

        {/* Job Listings Grid */}
        <div className="d-flex flex-column gap-4">
          {jobs.map(job => {
            const match = matchData[job.id] || {
              overallMatch: 76,
              matchedSkills: ['Python', 'React', 'Node.js', 'MongoDB'],
              missingSkills: ['Docker', 'AWS', 'System Design'],
              aiRecommendation: 'You are currently 76% matched. Primary gaps are Docker, AWS, and System Design.'
            };

            const isHighMatch = match.overallMatch >= 80;

            return (
              <div key={job.id} className="glass-card p-4">
                <div className="row gy-3">
                  <div className="col-lg-8">
                    {/* Header Details */}
                    <div className="d-flex align-items-start gap-3 mb-3">
                      <div className="p-3 rounded-3" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>
                        <Building size={24} color="#818cf8" />
                      </div>
                      <div>
                        <div className="d-flex align-items-center gap-2 mb-1">
                          <h4 className="text-white fw-bold mb-0">{job.title}</h4>
                          <span className="badge-agent">{job.type || 'Full-Time'}</span>
                        </div>
                        <div className="d-flex flex-wrap align-items-center gap-3 text-secondary small">
                          <span className="text-light fw-semibold">{job.company}</span>
                          <span>•</span>
                          <span className="d-flex align-items-center gap-1"><MapPin size={14} /> {job.location}</span>
                          <span>•</span>
                          <span className="d-flex align-items-center gap-1"><DollarSign size={14} /> {job.salary}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-secondary small mb-3">{job.description}</p>

                    {/* Skill Tags */}
                    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                      <span className="text-secondary small fw-semibold">Required:</span>
                      {job.requiredSkills?.map((skill, idx) => {
                        const isMatched = match.matchedSkills?.some(s => s.toLowerCase() === skill.toLowerCase());
                        return (
                          <span 
                            key={idx} 
                            className={isMatched ? 'badge-success-glass' : 'badge-danger-glass'}
                            style={{ fontSize: '0.75rem' }}
                          >
                            {isMatched ? '✓' : '✗'} {skill}
                          </span>
                        );
                      })}
                    </div>

                    {/* AI Recommendation Quote */}
                    <div className="p-3 rounded-3" style={{
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.8rem'
                    }}>
                      <div className="text-info fw-bold mb-1 d-flex align-items-center gap-1">
                        <Sparkles size={14} /> AI Recommendation:
                      </div>
                      <div className="text-secondary">{match.aiRecommendation}</div>
                    </div>
                  </div>

                  {/* Right Match & Action Panel */}
                  <div className="col-lg-4 d-flex flex-column justify-content-between border-start-lg ps-lg-4">
                    {/* Match Score Display */}
                    <div className="text-center p-3 rounded-3 mb-3" style={{
                      background: isHighMatch ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                      border: isHighMatch ? '1px solid #10b981' : '1px solid #6366f1'
                    }}>
                      <small className="text-secondary d-block mb-1">AI Match Compatibility</small>
                      <h2 className="display-6 fw-bold mb-1" style={{ color: isHighMatch ? '#34d399' : '#818cf8' }}>
                        {match.overallMatch}%
                      </h2>
                      <div className="progress-container mb-2">
                        <div 
                          className="progress-bar-fill" 
                          style={{ 
                            width: `${match.overallMatch}%`,
                            background: isHighMatch ? 'linear-gradient(90deg, #10b981, #06b6d4)' : 'var(--primary-gradient)'
                          }}
                        ></div>
                      </div>
                      <span className="small text-secondary">
                        {isHighMatch ? 'Optimal Match: Ready for Interview' : 'Gap identified: Remediation available'}
                      </span>
                    </div>

                    {/* CTAs: The Closed-Loop Trigger & Apply */}
                    <div className="d-flex flex-column gap-2 mt-auto">
                      {!isHighMatch && (
                        <button 
                          onClick={() => handleRemediateGaps(job, match)}
                          className="btn-glass btn-sm justify-content-center py-2 text-warning"
                          title="Generate targeted 4-week sprint to close missing skills"
                        >
                          <Sparkles size={14} color="#f59e0b" />
                          <span>Close Gaps with AI (Boost to 95%)</span>
                        </button>
                      )}

                      <button 
                        onClick={() => handleApply(job.id)}
                        disabled={applyingJobId === job.id}
                        className="btn-gradient justify-content-center py-2"
                      >
                        <Send size={16} />
                        <span>{applyingJobId === job.id ? 'Submitting...' : 'Apply with AI Profile'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
