import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { learningAPI } from '../services/api';
import RadarSkillChart from '../components/RadarSkillChart';
import CareerGraphView from '../components/CareerGraphView';
import { 
  Compass, 
  TrendingUp, 
  CheckSquare, 
  Square, 
  ArrowRight, 
  Sparkles, 
  AlertTriangle, 
  Zap, 
  Award,
  Play,
  FileText,
  Target
} from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [skills, setSkills] = useState(user?.skills || {
    'Python': 91,
    'React': 61,
    'Node.js': 72,
    'DSA': 54,
    'SQL': 80,
    'MongoDB': 85,
    'Docker': 38,
    'AWS': 42,
    'System Design': 40
  });

  const [readiness, setReadiness] = useState(user?.jobReadiness || 74);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Take Adaptive Assessment for React hooks', link: '/assessments', completed: false },
    { id: 2, text: 'Review Docker multi-stage build optimization', link: '/learning', completed: false },
    { id: 3, text: 'Complete 1 dynamic AI Mock Interview session', link: '/interview', completed: false },
    { id: 4, text: 'Audit resume keywords against Full Stack AI benchmark', link: '/resume', completed: true }
  ]);

  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  useEffect(() => {
    if (user?.skills) {
      setSkills(user.skills);
      setReadiness(user.jobReadiness || 74);
    }
  }, [user]);

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleActivateFeedbackLoop = async () => {
    setFeedbackLoading(true);
    try {
      const res = await learningAPI.triggerFeedbackLoop({
        targetRole: user?.targetRole || 'Full Stack AI Engineer',
        missingSkills: ['Docker', 'AWS', 'System Design'],
        jobMatchScore: 72
      });
      setFeedbackMsg(res.data.message);
      // Navigate to roadmap after brief notification
      setTimeout(() => {
        navigate('/learning');
      }, 1500);
    } catch (err) {
      console.error(err);
      navigate('/learning');
    } finally {
      setFeedbackLoading(false);
    }
  };

  return (
    <div className="student-dashboard py-4">
      <div className="container">
        {/* Top Header Banner */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-1">
              <span className="badge-agent">Career Intelligence Cockpit</span>
              <span className="text-secondary small">• Continuous Learning Loop</span>
            </div>
            <h2 className="text-white fw-bold mb-0">
              Good Morning, {user?.fullName || 'Aryan Sharma'} 👋
            </h2>
            <p className="text-secondary small mb-0">
              Target Career: <strong className="text-white">{user?.targetRole || 'Full Stack AI Engineer'}</strong>
            </p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button 
              onClick={handleActivateFeedbackLoop}
              disabled={feedbackLoading}
              className="btn-gradient d-flex align-items-center gap-2"
            >
              <Sparkles size={16} />
              <span>{feedbackLoading ? 'Orchestrating...' : 'Activate Closed-Loop AI Sprint'}</span>
            </button>
          </div>
        </div>

        {/* Feedback Alert if activated */}
        {feedbackMsg && (
          <div className="alert alert-success d-flex align-items-center gap-2 rounded-3 mb-4" role="alert">
            <Sparkles size={18} />
            <div>{feedbackMsg} Redirecting to your AI roadmap...</div>
          </div>
        )}

        {/* Key Metrics Row */}
        <div className="row g-3 mb-4">
          {/* Readiness Gauge */}
          <div className="col-md-4">
            <div className="glass-card p-3 h-100">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-secondary small fw-semibold">Overall Job Readiness</span>
                <span className="badge-agent"><TrendingUp size={12} /> Live Gauge</span>
              </div>
              <div className="d-flex align-items-baseline gap-2 mb-2">
                <h2 className="display-6 fw-bold text-white mb-0">{readiness}%</h2>
                <span className="text-success small fw-semibold">+18% projected</span>
              </div>
              <div className="progress-container mb-2">
                <div className="progress-bar-fill" style={{ width: `${readiness}%` }}></div>
              </div>
              <small className="text-secondary" style={{ fontSize: '0.75rem' }}>
                Based on assessments, verified projects, and ATS resume score.
              </small>
            </div>
          </div>

          {/* Target Role & Match */}
          <div className="col-md-4">
            <div className="glass-card p-3 h-100">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-secondary small fw-semibold">Target Role Match</span>
                <span className="badge-agent"><Target size={12} /> NeuraLink AI</span>
              </div>
              <div className="d-flex align-items-baseline gap-2 mb-2">
                <h2 className="display-6 fw-bold text-white mb-0">87%</h2>
                <span className="badge-success-glass">Top Tier</span>
              </div>
              <p className="text-secondary small mb-0" style={{ fontSize: '0.8rem' }}>
                Your strongest area is <strong>Python (91%)</strong> and <strong>MongoDB (85%)</strong>.
              </p>
            </div>
          </div>

          {/* Skill Gaps Card */}
          <div className="col-md-4">
            <div className="glass-card p-3 h-100" style={{ border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-secondary small fw-semibold">Autonomous Gap Alerts</span>
                <AlertTriangle size={16} color="#f59e0b" />
              </div>
              <div className="d-flex flex-wrap gap-1 mb-2">
                <span className="badge-warning-glass">Docker (38%)</span>
                <span className="badge-warning-glass">AWS (42%)</span>
                <span className="badge-warning-glass">System Design (40%)</span>
              </div>
              <small className="text-secondary d-block" style={{ fontSize: '0.75rem' }}>
                AI detected 3 competency deficits for your target role. 
              </small>
            </div>
          </div>
        </div>

        {/* Charts & Interactive Section */}
        <div className="row g-4 mb-4">
          {/* Radar Skill Visualizer */}
          <div className="col-lg-6">
            <div className="glass-card p-4 h-100">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0 text-white fw-bold">Candidate Competency Radar</h5>
                <span className="badge-agent">Adaptive Benchmark</span>
              </div>
              <RadarSkillChart skills={skills} />
            </div>
          </div>

          {/* Today's Tasks & Actions */}
          <div className="col-lg-6">
            <div className="glass-card p-4 h-100 d-flex flex-column">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0 text-white fw-bold">Daily Autonomous Tasks</h5>
                <span className="badge-agent">AI Coach Recommendations</span>
              </div>
              <div className="d-flex flex-column gap-2 mb-3 flex-grow-1">
                {tasks.map(task => (
                  <div 
                    key={task.id}
                    className="p-3 rounded-3 d-flex align-items-center justify-content-between"
                    style={{
                      background: task.completed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                      border: task.completed ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid var(--border-color)'
                    }}
                  >
                    <div 
                      className="d-flex align-items-center gap-2 cursor-pointer"
                      onClick={() => toggleTask(task.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      {task.completed ? (
                        <CheckSquare size={18} color="#10b981" />
                      ) : (
                        <Square size={18} color="#94a3b8" />
                      )}
                      <span className={`small ${task.completed ? 'text-decoration-line-through text-secondary' : 'text-white'}`}>
                        {task.text}
                      </span>
                    </div>
                    <Link to={task.link} className="btn btn-sm btn-glass px-2 py-1" style={{ fontSize: '0.75rem' }}>
                      <Play size={12} />
                    </Link>
                  </div>
                ))}
              </div>

              {/* Action Banner */}
              <div className="p-3 rounded-3 mt-auto" style={{
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.15))',
                border: '1px solid rgba(99, 102, 241, 0.3)'
              }}>
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fw-bold text-white small d-block">Career Feedback Loop</span>
                    <small className="text-secondary" style={{ fontSize: '0.75rem' }}>
                      Complete 1 assessment to trigger dynamic difficulty recalculation.
                    </small>
                  </div>
                  <Link to="/assessments" className="btn btn-sm btn-gradient py-1 px-3">
                    Start Test
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Career Graph Progression Tree */}
        <div className="mb-4">
          <CareerGraphView skills={skills} targetRole={user?.targetRole || 'Full Stack AI Engineer'} />
        </div>
      </div>
    </div>
  );
}
