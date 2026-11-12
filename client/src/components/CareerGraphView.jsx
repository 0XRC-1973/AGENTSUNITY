import React from 'react';
import { CheckCircle2, Circle, ArrowDown, Rocket, Layers, Cloud, Terminal, Cpu } from 'lucide-react';

export default function CareerGraphView({ skills = {}, targetRole = "Full Stack AI Engineer" }) {
  const isPythonAdvanced = (skills['Python'] || 91) >= 80;
  const isReactAdvanced = (skills['React'] || 61) >= 70;
  const isNodeAdvanced = (skills['Node.js'] || 72) >= 70;
  const isSystemDesignReady = (skills['System Design'] || 40) >= 65;
  const isCloudReady = (skills['AWS'] || 42) >= 65;
  const isDevOpsReady = (skills['Docker'] || 38) >= 65;

  return (
    <div className="glass-card p-4">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <h5 className="mb-1 text-white fw-bold d-flex align-items-center gap-2">
            <Layers size={20} color="#8b5cf6" />
            Autonomous Career Progression Graph
          </h5>
          <small className="text-secondary">
            Hierarchical skill graph tracking prerequisite mastery towards {targetRole}
          </small>
        </div>
        <span className="badge-agent">
          <Rocket size={14} /> Live Dependency Tree
        </span>
      </div>

      {/* Career Graph Tree Visualizer */}
      <div className="text-center py-2">
        {/* Root: Target Role */}
        <div className="d-inline-block px-4 py-2 rounded-4 mb-3" style={{
          background: 'rgba(99, 102, 241, 0.2)',
          border: '1px solid #6366f1',
          boxShadow: '0 0 20px rgba(99, 102, 241, 0.3)'
        }}>
          <span className="fw-bold text-white fs-6">🎯 Target: {targetRole}</span>
        </div>

        <div className="text-secondary mb-3"><ArrowDown size={20} /></div>

        {/* Level 1: Foundations */}
        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-4">
            <div className="p-3 rounded-3" style={{
              background: isReactAdvanced ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              border: isReactAdvanced ? '1px solid #10b981' : '1px solid var(--border-color)'
            }}>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-semibold text-white small">Frontend Core</span>
                {isReactAdvanced ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} color="#94a3b8" />}
              </div>
              <div className="small text-secondary">React (61%)</div>
              <div className="badge mt-2" style={{ background: isReactAdvanced ? '#065f46' : '#334155', color: '#fff', fontSize: '0.7rem' }}>
                {isReactAdvanced ? 'Advanced' : 'In Progress'}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-3" style={{
              background: isNodeAdvanced ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 255, 255, 0.03)',
              border: isNodeAdvanced ? '1px solid #10b981' : '1px solid var(--border-color)'
            }}>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-semibold text-white small">Backend APIs</span>
                {isNodeAdvanced ? <CheckCircle2 size={16} color="#10b981" /> : <Circle size={16} color="#94a3b8" />}
              </div>
              <div className="small text-secondary">Node.js (72%)</div>
              <div className="badge mt-2" style={{ background: isNodeAdvanced ? '#065f46' : '#334155', color: '#fff', fontSize: '0.7rem' }}>
                {isNodeAdvanced ? 'Advanced' : 'In Progress'}
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-3" style={{
              background: isPythonAdvanced ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
              border: isPythonAdvanced ? '1px solid #10b981' : '1px solid var(--border-color)'
            }}>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-semibold text-white small">AI & Algorithms</span>
                <CheckCircle2 size={16} color="#10b981" />
              </div>
              <div className="small text-secondary">Python (91%)</div>
              <div className="badge mt-2 bg-success" style={{ fontSize: '0.7rem' }}>
                Mastered
              </div>
            </div>
          </div>
        </div>

        <div className="text-secondary mb-3"><ArrowDown size={20} /></div>

        {/* Level 2: Advanced Converging System Tiers */}
        <div className="row g-3 justify-content-center mb-3">
          <div className="col-md-4">
            <div className="p-3 rounded-3" style={{
              background: isSystemDesignReady ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.08)',
              border: isSystemDesignReady ? '1px solid #10b981' : '1px dashed #f59e0b'
            }}>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-semibold text-white small">System Design</span>
                <Cpu size={16} color={isSystemDesignReady ? '#10b981' : '#f59e0b'} />
              </div>
              <div className="small text-secondary">Rate Limiters & Caching</div>
              <span className="badge mt-2" style={{ background: isSystemDesignReady ? '#065f46' : '#78350f', color: '#fde68a', fontSize: '0.7rem' }}>
                {isSystemDesignReady ? 'Ready' : 'Sprint Week 3'}
              </span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-3" style={{
              background: isCloudReady ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.08)',
              border: isCloudReady ? '1px solid #10b981' : '1px dashed #f59e0b'
            }}>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-semibold text-white small">Cloud (AWS)</span>
                <Cloud size={16} color={isCloudReady ? '#10b981' : '#f59e0b'} />
              </div>
              <div className="small text-secondary">ECS & IAM Security</div>
              <span className="badge mt-2" style={{ background: isCloudReady ? '#065f46' : '#78350f', color: '#fde68a', fontSize: '0.7rem' }}>
                {isCloudReady ? 'Ready' : 'Sprint Week 2'}
              </span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-3" style={{
              background: isDevOpsReady ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.08)',
              border: isDevOpsReady ? '1px solid #10b981' : '1px dashed #f59e0b'
            }}>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="fw-semibold text-white small">DevOps (Docker)</span>
                <Terminal size={16} color={isDevOpsReady ? '#10b981' : '#f59e0b'} />
              </div>
              <div className="small text-secondary">Multi-Stage Containers</div>
              <span className="badge mt-2" style={{ background: isDevOpsReady ? '#065f46' : '#78350f', color: '#fde68a', fontSize: '0.7rem' }}>
                {isDevOpsReady ? 'Ready' : 'Sprint Week 1'}
              </span>
            </div>
          </div>
        </div>

        <div className="text-secondary mb-3"><ArrowDown size={20} /></div>

        {/* Apex: Job Ready */}
        <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)',
          border: '1px solid #10b981',
          boxShadow: '0 0 25px rgba(16, 185, 129, 0.35)'
        }}>
          <Rocket size={18} color="#10b981" />
          <span className="fw-bold text-white">Job Ready Tier 🚀 (Projected 95% Match)</span>
        </div>
      </div>
    </div>
  );
}
