const aiService = require('../services/aiService');
const db = require('../config/db');

exports.startInterview = async (req, res) => {
  try {
    const targetRole = req.body.targetRole || (req.user ? req.user.targetRole : 'Full Stack AI Engineer');
    const firstQuestion = await aiService.getInterviewQuestion(targetRole, 1, []);

    return res.json({
      sessionId: `session_${Date.now()}`,
      targetRole,
      currentTurn: 1,
      totalTurns: 3,
      question: firstQuestion
    });
  } catch (err) {
    console.error('Error starting interview:', err);
    return res.status(500).json({ error: 'Failed to start interview: ' + err.message });
  }
};

exports.evaluateTurn = async (req, res) => {
  try {
    const { targetRole, question, answer, stage, previousTurns } = req.body;
    if (!question || !answer) {
      return res.status(400).json({ error: 'Question and answer are required.' });
    }

    // Evaluate answer with AI Interview Agent
    const evaluation = await aiService.evaluateInterview(
      targetRole || 'Full Stack AI Engineer',
      question,
      answer
    );

    // Fetch next progressive or contextual follow-up question
    const nextQuestion = await aiService.getInterviewQuestion(
      targetRole || 'Full Stack AI Engineer',
      (stage || 1) + 1,
      [...(previousTurns || []), { question, answer }]
    );

    return res.json({
      evaluation,
      nextQuestion
    });
  } catch (err) {
    console.error('Error evaluating turn:', err);
    return res.status(500).json({ error: 'Failed to evaluate response: ' + err.message });
  }
};

exports.finishInterview = (req, res) => {
  const { targetRole, overallScore, transcript } = req.body;

  let savedSession = null;
  if (req.user) {
    savedSession = db.saveInterview({
      userId: req.user.id,
      targetRole: targetRole || req.user.targetRole,
      overallScore: overallScore || 80,
      transcript: transcript || []
    });
  }

  return res.json({
    message: 'Mock interview completed successfully.',
    session: savedSession,
    feedbackSummary: 'Your performance indicates strong backend competencies with potential for growth in distributed systems and latency benchmarking.'
  });
};

exports.getInterviewHistory = (req, res) => {
  const history = db.getInterviewsByUser(req.user.id);
  return res.json({ history });
};
