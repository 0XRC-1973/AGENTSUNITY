import React, { useState } from 'react';
import { resumeAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export default function ResumeAnalyzer() {
  const { user } = useAuth();
  const [file, setFile] = useState(null);
  const [pastedText, setPastedText] = useState('');
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Full Stack AI Engineer');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('resumeFile', file);
      } else if (pastedText.trim()) {
        formData.append('resumeText', pastedText);
      } else {
        // Fallback demo text
        formData.append('resumeText', `Aryan Sharma - Full Stack Developer
Skills: Python, JavaScript, React, Node.js, Express, MongoDB, PostgreSQL, SQL, DSA, Git, REST APIs.
Experience: Built full-stack applications with React and Node.js. Integrated MongoDB databases.`);
      }
      formData.append('targetRole', targetRole);

      const res = await resumeAPI.analyze(formData);
      setResult(res.data.analysis);
    } catch (err) {
      console.error(err);
      setError('Failed to analyze resume. Please verify the file format or try pasting text.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-analyzer py-4">
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <span className="badge-agent mb-2">Resume Intelligence Agent</span>
          <h2 className="text-white fw-bold">AI Resume Parser & ATS Match Engine</h2>
          <p className="text-secondary small">
            Extract technical entities, compute real-time ATS match scores, and identify critical keyword omissions for {targetRole}.
          </p>
        </div>

        <div className="row g-4">
          {/* Upload & Input Form */}
          <div className="col-lg-5">
            <div className="glass-card p-4 h-100">
              <h5 className="text-white fw-bold mb-3 d-flex align-items-center gap-2">
                <UploadCloud size={20} color="#6366f1" />
                Upload Resume Document
              </h5>

              <form onSubmit={handleAnalyze}>
                <div className="mb-3">
                  <label className="form-label text-secondary small">Target Role Benchmark</label>
                  <select 
                    className="form-select form-control-dark"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                  >
                    <option value="Full Stack AI Engineer">Full Stack AI Engineer</option>
                    <option value="AI/ML Engineer">AI/ML Engineer</option>
                    <option value="Frontend Engineer">Frontend Engineer</option>
                    <option value="Backend Engineer">Backend Engineer</option>
                  </select>
                </div>

                {/* File Dropzone */}
                <div 
                  className="p-4 rounded-3 text-center mb-3"
                  style={{
                    border: '2px dashed rgba(99, 102, 241, 0.4)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('resumeFileInput').click()}
                >
                  <FileText size={36} color="#818cf8" className="mb-2" />
                  <div className="text-white fw-semibold small mb-1">
                    {file ? file.name : 'Click to select PDF / TXT resume'}
                  </div>
                  <div className="text-secondary" style={{ fontSize: '0.75rem' }}>
                    Standard ATS parsers evaluate .pdf, .docx, and .txt files
                  </div>
                  <input 
                    id="resumeFileInput"
                    type="file" 
                    className="d-none" 
                    accept=".pdf,.txt"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="text-center text-secondary small mb-3">—— OR PASTE RESUME TEXT ——</div>

                <div className="mb-3">
                  <textarea 
                    className="form-control form-control-dark"
                    rows="4"
                    placeholder="Paste resume content here for rapid parsing..."
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    style={{ fontSize: '0.85rem' }}
                  ></textarea>
                </div>

                {error && <div className="alert alert-danger py-2 small mb-3">{error}</div>}

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-gradient w-100 justify-content-center py-2"
                >
                  <Sparkles size={16} />
                  <span>{loading ? 'Analyzing with AI Agent...' : 'Analyze Resume with AI'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Results Analysis */}
          <div className="col-lg-7">
            {result ? (
              <div className="glass-card p-4 h-100">
                <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3" style={{ borderColor: 'var(--border-color)' }}>
                  <div>
                    <span className="badge-agent mb-1">ATS Evaluation Result</span>
                    <h4 className="text-white fw-bold mb-0">Candidate Intelligence Audit</h4>
                  </div>
                  <div className="text-end">
                    <span className="badge-agent fs-6 px-3 py-2" style={{
                      background: result.atsScore >= 75 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      borderColor: result.atsScore >= 75 ? '#10b981' : '#f59e0b',
                      color: result.atsScore >= 75 ? '#34d399' : '#fbbf24'
                    }}>
                      ATS Score: {result.atsScore}%
                    </span>
                  </div>
                </div>

                {/* Score breakdown progress */}
                <div className="mb-4">
                  <div className="d-flex align-items-center justify-content-between text-secondary small mb-1">
                    <span>ATS Matching Quality</span>
                    <span>{result.atsScore >= 75 ? 'Tier 1 Shortlist Grade' : 'Requires Optimization'}</span>
                  </div>
                  <div className="progress-container">
                    <div className="progress-bar-fill" style={{ width: `${result.atsScore}%` }}></div>
                  </div>
                </div>

                {/* Extracted Skills */}
                <div className="mb-4">
                  <label className="text-secondary small fw-semibold d-block mb-2">
                    Extracted Technical Skills ({result.extractedSkills?.length || 0})
                  </label>
                  <div className="d-flex flex-wrap gap-2">
                    {result.extractedSkills?.map((skill, idx) => (
                      <span key={idx} className="badge-agent" style={{ fontSize: '0.8rem' }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing Skills Alert */}
                {result.missingSkills?.length > 0 && (
                  <div className="p-3 rounded-3 mb-4" style={{
                    background: 'rgba(244, 63, 94, 0.1)',
                    border: '1px solid rgba(244, 63, 94, 0.3)'
                  }}>
                    <div className="d-flex align-items-center gap-2 mb-2 text-danger fw-bold small">
                      <AlertCircle size={16} />
                      <span>Missing Critical Skills for {targetRole}:</span>
                    </div>
                    <div className="d-flex flex-wrap gap-2">
                      {result.missingSkills.map((ms, idx) => (
                        <span key={idx} className="badge-danger-glass">
                          • {ms}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className="mb-3">
                  <label className="text-secondary small fw-semibold d-block mb-2">
                    AI Agent Optimization Recommendations:
                  </label>
                  <div className="d-flex flex-column gap-2">
                    {result.recommendations?.map((rec, idx) => (
                      <div key={idx} className="p-2 rounded-2 d-flex align-items-start gap-2" style={{
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.85rem'
                      }}>
                        <CheckCircle2 size={16} color="#10b981" className="mt-1 flex-shrink-0" />
                        <span className="text-light">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-5 h-100 d-flex flex-column align-items-center justify-content-center text-center">
                <FileText size={48} color="#6366f1" className="mb-3 opacity-50" />
                <h5 className="text-white fw-bold mb-2">No Resume Analyzed Yet</h5>
                <p className="text-secondary small" style={{ maxWidth: '380px' }}>
                  Upload your PDF resume or click 'Analyze Resume with AI' to invoke the Resume Intelligence Agent.
                </p>
                <button 
                  onClick={handleAnalyze} 
                  className="btn-glass btn-sm mt-2"
                >
                  Run Demo Analysis
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
