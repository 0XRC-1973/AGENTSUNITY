const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/start', interviewController.startInterview);
router.post('/evaluate-turn', interviewController.evaluateTurn);
router.post('/finish', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    return authenticateToken(req, res, next);
  }
  next();
}, interviewController.finishInterview);
router.get('/history', authenticateToken, interviewController.getInterviewHistory);

module.exports = router;
