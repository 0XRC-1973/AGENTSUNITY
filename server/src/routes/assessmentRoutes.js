const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/generate', assessmentController.generateAssessment);
router.post('/evaluate', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    return authenticateToken(req, res, next);
  }
  next();
}, assessmentController.evaluateAssessment);
router.get('/history', authenticateToken, assessmentController.getHistory);

module.exports = router;
