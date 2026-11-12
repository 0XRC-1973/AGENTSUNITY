import React, { useState, useEffect } from 'react';
import { learningAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Layers, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ArrowRight, 
  Award, 
  TrendingUp,
  FolderGit2,
  Terminal,
  Check,
  RefreshCw
} from 'lucide-react';

export default function CareerRoadmapView() {
  const { user, refreshUser } = useAuth();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completingWeek, setCompletingWeek] = useState(null);
  const [bannerNotice, setBannerNotice] = useState(null);

  useEffect(() => {
    fetchRoadmap();
  }, [user]);

  const fetchRoadmap = async () => {
    setLoading(true);
    try {
      const res = await learningAPI.getRoadmap();
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteMilestone = async (week) => {
    setCompletingWeek(week.week);
    try {
      let skillToBoost = 'Docker';
      if (week.week === 2) skillToBoost = 'AWS';
      if (week.week === 3) skillToBoost = 'System Design';
      if (week.week === 4) skillToBoost = 'React';

      const res = await learningAPI.completeMilestone({
        weekNumber: week.week,
        skillBoosted: skillToBoost,
        boostPoints: 28
      });

      setRoadmap(res.data.roadmap);
      setBannerNotice(`Milestone Week ${week.week} cleared! Elevated ${skillToBoost} proficiency by +28 points.`);
      if (refreshUser) refreshUser();
    } catch (err) {
      console.error(err);
    } finally {
      setCompletingWeek(null);
    }
  };

  return (
    <div className="career-roadmap py-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <span className="badge-agent mb-1">Learning & Career Intelligence Agents</span>
            <h2 className="text-white fw-bold mb-0">Autonomous Skill Gap Remediation Roadmap</h2>
            <p className="text-secondary small mb-0">
              Personalized curriculum synthesized directly from recruitment gap analysis.
            </p>
          </div>

          {roadmap && (
            <div className="d-flex align-items-center gap-3">
              <div className="text-end">
                <small className="text-secondary d-block">Simulated Competency Lift</small>
                <div className="d-flex align-items-center gap-2">
                  <span className="text-secondary">{roadmap.currentReadiness}%</span>
                  <span className="text-secondary">➔</span>
                  <span className="text-success fw-bold fs-5">{roadmap.projectedReadiness}%</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Milestone Banner */}
        {bannerNotice && (
          <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4" role="alert">
            <Sparkles size={18} />
            <div>{bannerNotice}</div>
          </div>
        )}

        {/* Roadmap Overview Metric Cards */}
        {roadmap && (
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <div className="glass-card p-3">
                <span className="text-secondary small fw-semibold d-block mb-1">Target Role Strategy</span>
                <h5 className="text-white fw-bold mb-1">{roadmap.targetRole}</h5>
                <span className="badge-agent">Tailored Sprint</span>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-card p-3">
                <span className="text-secondary small fw-semibold d-block mb-1">Identified Competency Gaps</span>
                <div className="d-flex flex-wrap gap-1">
                  {roadmap.skillGaps?.map((gap, idx) => (
                    <span key={idx} className="badge-warning-glass" style={{ fontSize: '0.72rem' }}>
                      {gap}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-card p-3">
                <span className="text-secondary small fw-semibold d-block mb-1">Projected Job Readiness</span>
                <div className="d-flex align-items-baseline gap-2 mb-1">
                  <h4 className="text-success fw-bold mb-0">{roadmap.projectedReadiness}%</h4>
                  <span className="badge-success-glass">Tier 1 Hiring Benchmark</span>
                </div>
                <div className="progress-container">
                  <div className="progress-bar-fill" style={{ width: `${roadmap.currentReadiness}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weekly Curriculum Timeline */}
        {roadmap ? (
          <div className="d-flex flex-column gap-4">
            {roadmap.weeks?.map((w, idx) => {
              const isDone = w.completed;
              return (
                <div 
                  key={w.week || idx} 
                  className="glass-card p-4"
                  style={{
                    border: isDone ? '1px solid #10b981' : '1px solid var(--border-color)',
                    background: isDone ? 'rgba(16, 185, 129, 0.05)' : 'var(--bg-card)'
                  }}
                >
                  <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3 border-bottom pb-2" style={{ borderColor: 'var(--border-color)' }}>
                    <div className="d-flex align-items-center gap-2">
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: isDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {isDone ? <CheckCircle2 size={18} color="#10b981" /> : <Terminal size={18} color="#818cf8" />}
                      </div>
                      <h5 className="text-white fw-bold mb-0">{w.title}</h5>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <span className="text-secondary small d-flex align-items-center gap-1">
                        <Clock size={14} /> ~{w.estimatedHours} hrs
                      </span>
                      {isDone ? (
                        <span className="badge-success-glass">✓ Cleared</span>
                      ) : (
                        <button 
                          onClick={() => handleCompleteMilestone(w)}
                          disabled={completingWeek === w.week}
                          className="btn btn-sm btn-gradient py-1 px-3"
                        >
                          <Check size={14} />
                          <span>{completingWeek === w.week ? 'Verifying...' : 'Verify & Complete'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="row gy-3">
                    {/* Topics */}
                    <div className="col-md-4 border-end-md" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="text-secondary small fw-semibold d-block mb-2">Core Topics:</span>
                      <ul className="list-unstyled mb-0 d-flex flex-column gap-1 small text-light">
                        {w.topics?.map((topic, tIdx) => (
                          <li key={tIdx} className="d-flex align-items-center gap-2">
                            <span className="text-info">•</span> {topic}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Practical Tasks */}
                    <div className="col-md-4 border-end-md" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="text-secondary small fw-semibold d-block mb-2">Hands-on Tasks:</span>
                      <ul className="list-unstyled mb-0 d-flex flex-column gap-1 small text-light">
                        {w.tasks?.map((task, kIdx) => (
                          <li key={kIdx} className="d-flex align-items-start gap-2">
                            <span className="text-warning">▹</span> {task}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Capstone Deliverable Project */}
                    <div className="col-md-4">
                      <span className="text-secondary small fw-semibold d-block mb-2">Capstone Project Artifact:</span>
                      <div className="p-3 rounded-3" style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-color)'
                      }}>
                        <div className="d-flex align-items-center gap-2 text-white fw-semibold small mb-1">
                          <FolderGit2 size={16} color="#8b5cf6" />
                          <span>{w.project}</span>
                        </div>
                        <small className="text-secondary" style={{ fontSize: '0.75rem' }}>
                          Verified project deliverables automatically append to your candidate profile.
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="glass-card p-5 text-center">
            <Layers size={48} color="#6366f1" className="mb-3 opacity-50" />
            <h4 className="text-white fw-bold mb-2">Generating Dynamic Roadmap...</h4>
            <p className="text-secondary small">Connecting with Learning Agent...</p>
          </div>
        )}
      </div>
    </div>
  );
}
