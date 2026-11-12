import React, { useState } from 'react';
import { interviewAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Mic, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  CheckCircle2, 
  Award, 
  MessageSquare, 
  ArrowRight,
  TrendingUp,
  Volume2
} from 'lucide-react';

export default function MockInterview() {
  const { user } = useAuth();
  const [targetRole, setTargetRole] = useState(user?.targetRole || 'Full Stack AI Engineer');
  const [sessionActive, setSessionActive] = useState(false);
  const [stage, setStage] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerInput, setAnswerInput] = useState('');
  const [transcript, setTranscript] = useState([]);
  const [loading, setLoading] = useState(false);
  const [finalReport, setFinalReport] = useState(null);

  const startInterview = async () => {
    setLoading(true);
    setTranscript([]);
    setFinalReport(null);
    setStage(1);

    try {
      const res = await interviewAPI.start(targetRole);
      setCurrentQuestion(res.data.question);
      setSessionActive(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendAnswer = async (e) => {
    if (e) e.preventDefault();
    if (!answerInput.trim()) return;

    const submittedAnswer = answerInput;
    setAnswerInput('');
    setLoading(true);

    try {
      const previousTurns = transcript.map(t => ({
        question: t.question,
        answer: t.answer
      }));

      const res = await interviewAPI.evaluateTurn({
        targetRole,
        question: currentQuestion.question,
        answer: submittedAnswer,
        stage,
        previousTurns
      });

      const evaluation = res.data.evaluation;
      const nextQ = res.data.nextQuestion;

      const updatedTurn = {
        stage,
        question: currentQuestion.question,
        answer: submittedAnswer,
        evaluation
      };

      const newTranscript = [...transcript, updatedTurn];
      setTranscript(newTranscript);

      if (stage >= 3) {
        // Complete interview
        const finishRes = await interviewAPI.finish({
          targetRole,
          overallScore: evaluation.overallScore,
          transcript: newTranscript
        });
        setFinalReport({
          ...finishRes.data,
          scores: {
            technicalAccuracy: Math.round(newTranscript.reduce((total, turn) => total + (turn.evaluation?.technicalAccuracy || 0), 0) / newTranscript.length),
            communication: Math.round(newTranscript.reduce((total, turn) => total + (turn.evaluation?.communication || 0), 0) / newTranscript.length),
            depth: Math.round(newTranscript.reduce((total, turn) => total + (turn.evaluation?.depth || 0), 0) / newTranscript.length),
            confidence: Math.round(newTranscript.reduce((total, turn) => total + (turn.evaluation?.confidence || 0), 0) / newTranscript.length)
          }
        });
        setSessionActive(false);
      } else {
        setStage(prev => prev + 1);
        setCurrentQuestion(nextQ);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mock-interview py-4">
      <div className="container">
        {/* Header */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
          <div>
            <span className="badge-agent mb-1">Adaptive Mock Interview Agent</span>
            <h2 className="text-white fw-bold mb-0">Conversational AI Technical Interview</h2>
            <p className="text-secondary small mb-0">
              Real-time conversational evaluation of Technical Accuracy, Communication, Depth, and Confidence.
            </p>
          </div>

          {!sessionActive && (
            <div className="d-flex align-items-center gap-2">
              <select 
                className="form-select form-control-dark"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                style={{ width: '220px' }}
              >
                <option value="Full Stack AI Engineer">Full Stack AI Engineer</option>
                <option value="AI/ML Engineer">AI/ML Engineer</option>
                <option value="Backend Engineer">Backend Engineer</option>
                <option value="Frontend Engineer">Frontend Engineer</option>
              </select>

              <button 
                onClick={startInterview}
                disabled={loading}
                className="btn-gradient d-flex align-items-center gap-2"
              >
                <Mic size={16} />
                <span>{loading ? 'Starting AI Session...' : 'Start Mock Interview'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Final Report Modal / Card */}
        {finalReport && (
          <div className="glass-card p-4 mb-4" style={{
            border: '1px solid rgba(99, 102, 241, 0.5)',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(16, 185, 129, 0.1) 100%)'
          }}>
            <div className="d-flex align-items-center justify-content-between mb-3 border-bottom pb-3" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <span className="badge-success-glass mb-1">Interview Completed</span>
                <h4 className="text-white fw-bold mb-0">Performance Diagnostic Report</h4>
              </div>
              <button onClick={startInterview} className="btn-gradient btn-sm">
                Retake Interview
              </button>
            </div>

            <div className="row g-3 text-center mb-3">
              <div className="col-md-3">
                <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <small className="text-secondary d-block mb-1">Technical Accuracy</small>
                  <h3 className="text-white fw-bold mb-0">{finalReport.scores?.technicalAccuracy || 0}%</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <small className="text-secondary d-block mb-1">Communication</small>
                  <h3 className="text-white fw-bold mb-0">{finalReport.scores?.communication || 0}%</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <small className="text-secondary d-block mb-1">Depth & Rigor</small>
                  <h3 className="text-white fw-bold mb-0">{finalReport.scores?.depth || 0}%</h3>
                </div>
              </div>
              <div className="col-md-3">
                <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.04)' }}>
                  <small className="text-secondary d-block mb-1">Confidence</small>
                  <h3 className="text-white fw-bold mb-0">{finalReport.scores?.confidence || 0}%</h3>
                </div>
              </div>
            </div>

            <p className="text-light small mb-0">{finalReport.feedbackSummary}</p>
          </div>
        )}

        {/* Active Interview Terminal */}
        {sessionActive ? (
          <div className="glass-card p-4">
            {/* Stage Indicator */}
            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-2" style={{ borderColor: 'var(--border-color)' }}>
              <div className="d-flex align-items-center gap-2">
                <span className="pulse-dot"></span>
                <span className="fw-semibold text-white small">Live Simulation: Turn {stage} of 3</span>
              </div>
              <span className="badge-agent">{currentQuestion?.category}</span>
            </div>

            {/* Conversation Log */}
            <div className="d-flex flex-column gap-3 mb-4" style={{ maxHeight: '420px', overflowY: 'auto' }}>
              {transcript.map((item, idx) => (
                <div key={idx} className="d-flex flex-column gap-2">
                  {/* Interviewer Question */}
                  <div className="d-flex align-items-start gap-2">
                    <div className="p-2 rounded-circle" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
                      <Bot size={18} color="#818cf8" />
                    </div>
                    <div className="p-3 rounded-3" style={{ background: 'rgba(99, 102, 241, 0.1)', maxWidth: '85%' }}>
                      <span className="text-white small">{item.question}</span>
                    </div>
                  </div>

                  {/* Candidate Answer */}
                  <div className="d-flex align-items-start gap-2 align-self-end">
                    <div className="p-3 rounded-3" style={{ background: 'rgba(255, 255, 255, 0.05)', maxWidth: '85%' }}>
                      <span className="text-white small">{item.answer}</span>
                    </div>
                    <div className="p-2 rounded-circle" style={{ background: 'rgba(6, 182, 212, 0.2)' }}>
                      <User size={18} color="#06b6d4" />
                    </div>
                  </div>

                  {/* AI Turn Scorecard */}
                  {item.evaluation && (
                    <div className="p-3 rounded-3 ms-4 me-4 my-1" style={{
                      background: 'rgba(15, 23, 42, 0.9)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      fontSize: '0.78rem'
                    }}>
                      <div className="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-1">
                        <span className="text-info fw-bold">Turn Evaluation:</span>
                        <div className="d-flex gap-2">
                          <span className="badge-agent">Accuracy: {item.evaluation.technicalAccuracy}%</span>
                          <span className="badge-agent">Communication: {item.evaluation.communication}%</span>
                          <span className="badge-agent">Depth: {item.evaluation.depth}%</span>
                        </div>
                      </div>
                      <div className="text-secondary">{item.evaluation.feedback}</div>
                    </div>
                  )}
                </div>
              ))}

              {/* Current Pending Question */}
              {currentQuestion && (
                <div className="d-flex align-items-start gap-2">
                  <div className="p-2 rounded-circle" style={{ background: 'rgba(99, 102, 241, 0.2)' }}>
                    <Bot size={18} color="#818cf8" />
                  </div>
                  <div className="p-3 rounded-3" style={{
                    background: 'rgba(99, 102, 241, 0.15)',
                    border: '1px solid rgba(99, 102, 241, 0.4)',
                    maxWidth: '85%'
                  }}>
                    <span className="text-white fw-semibold small">{currentQuestion.question}</span>
                    {currentQuestion.expectedTopics && (
                      <div className="mt-2 text-secondary" style={{ fontSize: '0.72rem' }}>
                        Expected focus: {currentQuestion.expectedTopics.slice(0, 3).join(', ')}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Answer Input Area */}
            <form onSubmit={handleSendAnswer}>
              <div className="mb-2">
                <textarea 
                  className="form-control form-control-dark"
                  rows="3"
                  placeholder="Formulate your technical response (e.g., explain architectures, mechanisms, trade-offs)..."
                  value={answerInput}
                  onChange={(e) => setAnswerInput(e.target.value)}
                ></textarea>
              </div>

              <div className="d-flex align-items-center justify-content-between">
                <small className="text-secondary">
                  💡 Tip: The agent adapts follow-up questions dynamically according to your keywords.
                </small>
                <button 
                  type="submit"
                  disabled={loading || !answerInput.trim()}
                  className="btn-gradient px-4 py-2"
                >
                  <span>{loading ? 'Evaluating...' : 'Submit Response'}</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="glass-card p-5 text-center">
            <Mic size={48} color="#818cf8" className="mb-3 opacity-50" />
            <h4 className="text-white fw-bold mb-2">Simulate Real High-Stakes Technical Interviews</h4>
            <p className="text-secondary small mx-auto mb-4" style={{ maxWidth: '480px' }}>
              Our multi-agent system does not ask static questions. It listens to your answers, identifies gaps, probes deeper into architectural trade-offs, and provides immediate diagnostic feedback.
            </p>
            <button onClick={startInterview} className="btn-gradient px-4 py-2">
              Launch Interview Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
