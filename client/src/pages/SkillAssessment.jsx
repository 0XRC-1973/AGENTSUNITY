import React, { useState } from 'react';
import { assessmentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Award, 
  AlertCircle,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

export default function SkillAssessment() {
  const { user, refreshUser } = useAuth();
  const [skill, setSkill] = useState('Python');
  const [difficulty, setDifficulty] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setEvaluationResult(null);
    setSelectedAnswers({});

    try {
      const res = await assessmentAPI.generate(skill, difficulty);
      setQuestions(res.data.questions || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (qId, opt) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const handleSubmit = async () => {
    setEvaluating(true);
    try {
      const answersPayload = Object.keys(selectedAnswers).map(qId => ({
        questionId: qId,
        selectedAnswer: selectedAnswers[qId]
      }));

      const res = await assessmentAPI.evaluate(skill, difficulty, answersPayload);
      setEvaluationResult(res.data.evaluation);
      if (refreshUser) refreshUser();
    } catch (err) {
      console.error(err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="skill-assessment py-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <span className="badge-agent mb-1">Assessment Intelligence Agent</span>
            <h2 className="text-white fw-bold mb-0">Adaptive Skill Assessment Arena</h2>
            <p className="text-secondary small mb-0">
              Solve dynamically calibrated challenges. Your score updates your verified skill profile in real-time.
            </p>
          </div>

          {/* Skill Selector Controls */}
          <div className="d-flex align-items-center gap-2">
            <select 
              className="form-select form-control-dark"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              style={{ width: '150px' }}
            >
              <option value="Python">Python</option>
              <option value="React">React</option>
              <option value="Docker">Docker</option>
              <option value="DSA">DSA</option>
              <option value="SQL">SQL</option>
            </select>

            <select 
              className="form-select form-control-dark"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{ width: '130px' }}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button 
              onClick={() => handleGenerate()}
              disabled={loading}
              className="btn-gradient d-flex align-items-center gap-2"
            >
              <Sparkles size={16} />
              <span>{loading ? 'Generating...' : 'Start Assessment'}</span>
            </button>
          </div>
        </div>

        {/* Evaluation Summary Card if complete */}
        {evaluationResult && (
          <div className="glass-card p-4 mb-4" style={{
            border: '1px solid rgba(16, 185, 129, 0.4)',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(99, 102, 241, 0.05) 100%)'
          }}>
            <div className="row align-items-center gy-3">
              <div className="col-md-3 text-center border-end" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-secondary small d-block mb-1">Score Accuracy</span>
                <h2 className="display-5 fw-bold text-success mb-0">{evaluationResult.accuracy}%</h2>
                <small className="text-secondary">{evaluationResult.correctCount} of {evaluationResult.totalQuestions} correct</small>
              </div>

              <div className="col-md-4 border-end" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-secondary small d-block mb-1">Verified Skill Proficiency</span>
                <div className="d-flex align-items-baseline gap-2">
                  <h3 className="text-white fw-bold mb-0">{evaluationResult.updatedProficiency}%</h3>
                  <span className="text-success small fw-semibold">+15 pts</span>
                </div>
                <small className="text-secondary">Updated on your Career Intelligence profile.</small>
              </div>

              <div className="col-md-5">
                <span className="text-secondary small d-block mb-1">Agent Feedback & Adaptive Next Tier</span>
                <p className="text-light small mb-2">{evaluationResult.feedback}</p>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge-agent">Recommended: {evaluationResult.nextDifficulty}</span>
                  <button 
                    onClick={() => {
                      setDifficulty(evaluationResult.nextDifficulty);
                      handleGenerate();
                    }}
                    className="btn btn-sm btn-glass py-1 px-2 d-flex align-items-center gap-1"
                  >
                    <RefreshCw size={12} /> Next Level
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Question List */}
        {questions.length > 0 ? (
          <div className="d-flex flex-column gap-4">
            {questions.map((q, idx) => (
              <div key={q.id || idx} className="glass-card p-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                  <span className="badge-agent">Question {idx + 1} of {questions.length}</span>
                  <span className="badge-warning-glass">{q.difficulty}</span>
                </div>

                <h5 className="text-white fw-bold mb-3">{q.question}</h5>

                {/* Options */}
                <div className="row g-2 mb-3">
                  {q.options?.map((opt, oIdx) => {
                    const isSelected = selectedAnswers[q.id] === opt;
                    return (
                      <div key={oIdx} className="col-md-6">
                        <div 
                          className="p-3 rounded-3 d-flex align-items-center gap-3 cursor-pointer"
                          style={{
                            background: isSelected ? 'rgba(99, 102, 241, 0.25)' : 'rgba(255, 255, 255, 0.03)',
                            border: isSelected ? '1px solid #6366f1' : '1px solid var(--border-color)',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => handleSelectOption(q.id, opt)}
                        >
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: isSelected ? '2px solid #818cf8' : '2px solid #64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}>
                            {isSelected && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#818cf8' }}></div>}
                          </div>
                          <span className={`small ${isSelected ? 'text-white fw-semibold' : 'text-light'}`}>
                            {opt}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="d-flex justify-content-end mb-5">
              <button 
                onClick={handleSubmit}
                disabled={evaluating || Object.keys(selectedAnswers).length === 0}
                className="btn-gradient px-4 py-2"
              >
                <span>{evaluating ? 'Evaluating with AI Agent...' : 'Submit Assessment for Evaluation'}</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ) : (
          <div className="glass-card p-5 text-center">
            <Award size={48} color="#6366f1" className="mb-3 opacity-50" />
            <h4 className="text-white fw-bold mb-2">Ready to Prove Your Skills?</h4>
            <p className="text-secondary small mx-auto" style={{ maxWidth: '460px' }}>
              Select a technical subject like Python, React, or Docker and click 'Start Assessment' to launch adaptive questions.
            </p>
            <button 
              onClick={() => handleGenerate()} 
              className="btn-gradient px-4 py-2 mt-2"
            >
              Generate Challenges Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
