const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/stats', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    return authenticateToken(req, res, next);
  }
  next();
}, recruiterController.getRecruiterStats);

router.post('/status', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    return authenticateToken(req, res, next);
  }
  next();
}, recruiterController.updateCandidateStatus);

module.exports = router;
