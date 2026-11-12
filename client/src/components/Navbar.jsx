import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Bot, 
  Briefcase, 
  FileText, 
  CheckCircle2, 
  Compass, 
  Mic, 
  Users, 
  LogOut, 
  LogIn, 
  Sparkles,
  Zap
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, login } = useAuth();
  const location = useLocation();

  const handleQuickLogin = async (role) => {
    try {
      if (role === 'STUDENT') {
        await login('student@careermind.ai', 'password123');
      } else {
        await login('recruiter@techhire.ai', 'password123');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg sticky-top" style={{
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.85rem 1.5rem',
      zIndex: 1000
    }}>
      <div className="container-fluid">
        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center gap-2 text-decoration-none" to="/">
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'var(--primary-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <span className="h5 mb-0 fw-bold d-block" style={{ letterSpacing: '-0.02em', color: '#fff' }}>
              AGENTS <span className="gradient-text">UNITY</span>
            </span>
            <small style={{ fontSize: '0.65rem', color: 'var(--text-muted)', display: 'block', marginTop: '-3px' }}>
              AGENTSUNITY PLATFORM
            </small>
          </div>
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="navbar-toggler border-0" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navContent"
        >
          <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-1">
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 ${isActive('/dashboard') ? 'text-white fw-bold' : 'text-secondary'}`}
                style={{ background: isActive('/dashboard') ? 'rgba(99, 102, 241, 0.15)' : 'transparent' }}
                to="/dashboard"
              >
                <Compass size={18} />
                <span>Career Cockpit</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 ${isActive('/resume') ? 'text-white fw-bold' : 'text-secondary'}`}
                style={{ background: isActive('/resume') ? 'rgba(99, 102, 241, 0.15)' : 'transparent' }}
                to="/resume"
              >
                <FileText size={18} />
                <span>Resume Studio</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 ${isActive('/assessments') ? 'text-white fw-bold' : 'text-secondary'}`}
                style={{ background: isActive('/assessments') ? 'rgba(99, 102, 241, 0.15)' : 'transparent' }}
                to="/assessments"
              >
                <CheckCircle2 size={18} />
                <span>Assessments</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 ${isActive('/interview') ? 'text-white fw-bold' : 'text-secondary'}`}
                style={{ background: isActive('/interview') ? 'rgba(99, 102, 241, 0.15)' : 'transparent' }}
                to="/interview"
              >
                <Mic size={18} />
                <span>Mock Interview</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 ${isActive('/jobs') ? 'text-white fw-bold' : 'text-secondary'}`}
                style={{ background: isActive('/jobs') ? 'rgba(99, 102, 241, 0.15)' : 'transparent' }}
                to="/jobs"
              >
                <Briefcase size={18} />
                <span>Job Matching</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                className={`nav-link px-3 py-2 rounded-3 d-flex align-items-center gap-2 ${isActive('/recruiter') ? 'text-white fw-bold' : 'text-secondary'}`}
                style={{ background: isActive('/recruiter') ? 'rgba(99, 102, 241, 0.15)' : 'transparent' }}
                to="/recruiter"
              >
                <Users size={18} />
                <span>Recruiter Portal</span>
              </Link>
            </li>
          </ul>

          {/* Right Action Cluster */}
          <div className="d-flex align-items-center gap-2">
            {/* Live Agents Status */}
            <div className="d-none d-xl-flex align-items-center gap-2 px-3 py-1 rounded-pill" style={{
              background: 'rgba(16, 185, 129, 0.1)',
              border: '1px solid rgba(16, 185, 129, 0.25)',
              fontSize: '0.78rem',
              color: '#34d399'
            }}>
              <span className="pulse-dot"></span>
              <span>6 Agents Online</span>
            </div>

            {user ? (
              <div className="d-flex align-items-center gap-2">
                <div className="text-end d-none d-md-block">
                  <div className="fw-semibold text-white small">{user.fullName}</div>
                  <span className={`badge ${user.role === 'RECRUITER' ? 'bg-primary' : 'bg-secondary'}`} style={{ fontSize: '0.68rem' }}>
                    {user.role}
                  </span>
                </div>
                <button 
                  onClick={logout} 
                  className="btn btn-sm btn-glass px-2 py-1"
                  title="Log out"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <button 
                  onClick={() => handleQuickLogin('STUDENT')}
                  className="btn btn-sm btn-gradient py-1 px-3 d-flex align-items-center gap-1"
                >
                  <Zap size={14} />
                  <span>Student Demo</span>
                </button>
                <button 
                  onClick={() => handleQuickLogin('RECRUITER')}
                  className="btn btn-sm btn-glass py-1 px-2 d-flex align-items-center gap-1"
                  title="Login as Recruiter"
                >
                  <Users size={14} />
                  <span>Recruiter</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
