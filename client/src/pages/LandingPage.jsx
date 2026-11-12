import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  FileText, 
  Mic, 
  Briefcase, 
  Cpu, 
  ShieldCheck, 
  RefreshCw,
  TrendingUp
} from 'lucide-react';

export default function LandingPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStudentDemo = async () => {
    await login('student@careermind.ai', 'password123');
    navigate('/dashboard');
  };

  const handleRecruiterDemo = async () => {
    await login('recruiter@techhire.ai', 'password123');
    navigate('/recruiter');
  };

  return (
    <div className="landing-page py-5">
      <div className="container">
        {/* Hero Section */}
        <div className="row align-items-center gy-5 py-lg-5">
          <div className="col-lg-7 text-center text-lg-start">
            <div className="badge-agent mb-3 px-3 py-2">
              <Sparkles size={16} color="#818cf8" />
              <span>Next-Gen Autonomous AI Platform</span>
            </div>
            
            <h1 className="display-4 fw-extrabold mb-3" style={{ letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Learn. Practice. Prove. <br />
              <span className="gradient-text">Get Hired by AI Intelligence.</span>
            </h1>
            
            <p className="lead text-secondary mb-4" style={{ fontSize: '1.2rem', maxWidth: '620px' }}>
              <strong>AGENTS UNITY</strong> is an autonomous multi-agent ecosystem that evaluates student skills, 
              closes competency gaps with personalized roadmaps, conducts dynamic mock interviews, and continuously updates career readiness based on recruitment feedback.
            </p>

            <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-4">
              <button 
                onClick={handleStudentDemo}
                className="btn-gradient fs-6 px-4 py-3"
              >
                <span>Launch Student Cockpit</span>
                <ArrowRight size={18} />
              </button>
              
              <button 
                onClick={handleRecruiterDemo}
                className="btn-glass fs-6 px-4 py-3"
              >
                <Briefcase size={18} color="#06b6d4" />
                <span>Recruiter Portal</span>
              </button>
            </div>

            {/* Quick credentials teaser */}
            <div className="p-3 rounded-3" style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)',
              maxWidth: '540px'
            }}>
              <div className="d-flex align-items-center gap-3 small text-secondary">
                <span>⚡ <strong>Quick Credentials:</strong></span>
                <span>Student: <code>student@careermind.ai</code></span>
                <span>•</span>
                <span>Pass: <code>password123</code></span>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="glass-card p-4 position-relative" style={{
              boxShadow: '0 20px 50px rgba(99, 102, 241, 0.25)',
              border: '1px solid rgba(99, 102, 241, 0.4)'
            }}>
              <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-2" style={{ borderColor: 'var(--border-color)' }}>
                <div className="d-flex align-items-center gap-2">
                  <Bot size={20} color="#8b5cf6" />
                  <span className="fw-bold text-white">Central AI Orchestrator</span>
                </div>
                <span className="badge-agent">State Engine</span>
              </div>

              {/* Loop Visualizer */}
              <div className="d-flex flex-column gap-2 small">
                <div className="p-2 rounded-2 d-flex align-items-center justify-content-between" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
                  <span>1. Initial Skill Assessment</span>
                  <span className="text-success fw-bold">Python 91% • DSA 54%</span>
                </div>
                <div className="p-2 rounded-2 d-flex align-items-center justify-content-between" style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                  <span>2. Autonomous Roadmap</span>
                  <span className="text-info fw-bold">4-Week Remediation</span>
                </div>
                <div className="p-2 rounded-2 d-flex align-items-center justify-content-between" style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)' }}>
                  <span>3. AI Job Matching</span>
                  <span className="text-primary fw-bold">72% Initial Match</span>
                </div>
                <div className="p-2 rounded-2 d-flex align-items-center justify-content-between" style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  <span>4. Dynamic Mock Interview</span>
                  <span className="text-warning fw-bold">Accuracy 82%</span>
                </div>
                <div className="p-2 rounded-2 d-flex align-items-center justify-content-between" style={{ background: 'linear-gradient(90deg, rgba(99, 102, 241, 0.2), rgba(16, 185, 129, 0.2))', border: '1px solid #10b981' }}>
                  <span className="fw-bold text-white">5. Closed-Loop Boost 🚀</span>
                  <span className="text-white fw-bold">72% ➔ 95% Ready</span>
                </div>
              </div>

              <div className="mt-3 pt-3 border-top d-flex align-items-center justify-content-between text-secondary small" style={{ borderColor: 'var(--border-color)' }}>
                <span>Autonomous Feedback Loop</span>
                <span className="text-success">Active & Real-Time</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 6 Specialized Agents */}
        <div className="py-5">
          <div className="text-center mb-5">
            <span className="badge-agent mb-2">Multi-Agent Intelligence</span>
            <h2 className="fw-bold text-white">6 Autonomous AI Agents Coordinating For You</h2>
            <p className="text-secondary mx-auto" style={{ maxWidth: '600px' }}>
              Unlike static course portals or generic chat bots, AGENTS UNITY uses coordinated agents with memory, adaptive difficulty, and automated remediation.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="glass-card p-4 h-100">
                <div className="mb-3 d-inline-block p-3 rounded-3" style={{ background: 'rgba(99, 102, 241, 0.15)' }}>
                  <Layers size={24} color="#818cf8" />
                </div>
                <h5 className="text-white fw-bold">1. Learning Agent</h5>
                <p className="text-secondary small mb-0">
                  Sequences personalized learning paths, calculates weekly milestone hours, and tailors hands-on project tasks to target career roles.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-card p-4 h-100">
                <div className="mb-3 d-inline-block p-3 rounded-3" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
                  <CheckCircle2 size={24} color="#06b6d4" />
                </div>
                <h5 className="text-white fw-bold">2. Assessment Agent</h5>
                <p className="text-secondary small mb-0">
                  Generates adaptive MCQ and coding challenges across Easy, Medium, and Hard tiers, upgrading difficulty in real-time as candidate accuracy grows.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-card p-4 h-100">
                <div className="mb-3 d-inline-block p-3 rounded-3" style={{ background: 'rgba(16, 185, 129, 0.15)' }}>
                  <FileText size={24} color="#10b981" />
                </div>
                <h5 className="text-white fw-bold">3. Resume Agent</h5>
                <p className="text-secondary small mb-0">
                  Deep PDF text parsing, ATS compatibility scoring, missing prerequisite flags, and actionable suggestions to optimize project descriptions.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-card p-4 h-100">
                <div className="mb-3 d-inline-block p-3 rounded-3" style={{ background: 'rgba(245, 158, 11, 0.15)' }}>
                  <Briefcase size={24} color="#f59e0b" />
                </div>
                <h5 className="text-white fw-bold">4. Job Matching Agent</h5>
                <p className="text-secondary small mb-0">
                  Calculates hybrid weighted cosine similarity between candidate skills and live job descriptions, identifying exact gap clusters.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-card p-4 h-100">
                <div className="mb-3 d-inline-block p-3 rounded-3" style={{ background: 'rgba(244, 63, 94, 0.15)' }}>
                  <Mic size={24} color="#f43f5e" />
                </div>
                <h5 className="text-white fw-bold">5. Mock Interview Agent</h5>
                <p className="text-secondary small mb-0">
                  Conversational AI interviewer dynamically questioning candidate, analyzing Technical Accuracy, Communication, Depth, and Confidence.
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="glass-card p-4 h-100" style={{ border: '1px solid rgba(99, 102, 241, 0.4)' }}>
                <div className="mb-3 d-inline-block p-3 rounded-3" style={{ background: 'rgba(139, 92, 246, 0.2)' }}>
                  <RefreshCw size={24} color="#c084fc" />
                </div>
                <h5 className="text-white fw-bold">6. Career & Feedback Agent</h5>
                <p className="text-secondary small mb-0">
                  The core feedback loop USP: analyzes recruitment rejections or low match scores, immediately issuing a 4-week sprint to lift readiness to 95%+.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
