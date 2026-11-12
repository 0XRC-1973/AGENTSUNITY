const express = require('express');
const router = express.Router();
const learningController = require('../controllers/learningController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/roadmap', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    return authenticateToken(req, res, next);
  }
  next();
}, learningController.getRoadmap);

router.post('/trigger-feedback-loop', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    return authenticateToken(req, res, next);
  }
  next();
}, learningController.triggerFeedbackLoop);

router.post('/complete-milestone', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    return authenticateToken(req, res, next);
  }
  next();
}, learningController.completeMilestone);

module.exports = router;
