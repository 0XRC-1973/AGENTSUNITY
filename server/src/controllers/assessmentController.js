const aiService = require('../services/aiService');
const db = require('../config/db');

exports.generateAssessment = async (req, res) => {
  try {
    const { skill, difficulty } = req.body;
    if (!skill) {
      return res.status(400).json({ error: 'Skill is required to generate assessment questions.' });
    }

    const questions = await aiService.generateAssessment(skill, difficulty || 'Medium');
    return res.json({
      skill,
      difficulty: difficulty || 'Medium',
      questions
    });
  } catch (err) {
    console.error('Error generating assessment:', err);
    return res.status(500).json({ error: 'Failed to generate assessment: ' + err.message });
  }
};

exports.evaluateAssessment = async (req, res) => {
  try {
    const { skill, difficulty, answers } = req.body;
    if (!skill || !answers) {
      return res.status(400).json({ error: 'Skill and answers are required.' });
    }

    const result = await aiService.evaluateAssessment(skill, difficulty || 'Medium', answers);

    // If authenticated, update candidate skill score
    if (req.user) {
      db.updateUserSkills(req.user.id, {
        [skill]: result.updatedProficiency
      });

      db.saveAssessment({
        userId: req.user.id,
        skill,
        difficulty,
        score: result.score,
        accuracy: result.accuracy,
        updatedProficiency: result.updatedProficiency
      });
    }

    return res.json({
      success: true,
      evaluation: result
    });
  } catch (err) {
    console.error('Error evaluating assessment:', err);
    return res.status(500).json({ error: 'Failed to evaluate assessment: ' + err.message });
  }
};

exports.getHistory = (req, res) => {
  const history = db.getAssessmentsByUser(req.user.id);
  return res.json({ history });
};
