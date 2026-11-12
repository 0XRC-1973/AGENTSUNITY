import React from 'react';
import { Bot, Shield, Cpu, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto py-4" style={{
      background: 'rgba(9, 13, 22, 0.95)',
      borderTop: '1px solid var(--border-color)',
      color: 'var(--text-muted)',
      fontSize: '0.85rem'
    }}>
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-md-6 text-center text-md-start">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-1">
              <Bot size={18} color="#818cf8" />
              <span className="fw-bold text-white">AGENTS UNITY</span>
              <span className="badge-agent" style={{ fontSize: '0.7rem' }}>AGENTSUNITY Platform</span>
            </div>
            <p className="mb-0 text-secondary" style={{ fontSize: '0.8rem' }}>
              Autonomous AI Learning & Recruitment Intelligence — <em>Learn. Practice. Prove. Get Hired.</em>
            </p>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <div className="d-flex align-items-center justify-content-center justify-content-md-end gap-3">
              <span className="d-inline-flex align-items-center gap-1">
                <Cpu size={14} color="#06b6d4" /> Python FastAPI Engine
              </span>
              <span className="d-inline-flex align-items-center gap-1">
                <Shield size={14} color="#10b981" /> JWT & RBAC
              </span>
              <span className="d-inline-flex align-items-center gap-1">
                <Sparkles size={14} color="#f59e0b" /> Closed-Loop AI
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
