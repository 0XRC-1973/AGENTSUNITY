const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', jobController.getAllJobs);
router.get('/:id', jobController.getJobById);
router.post('/:id/match', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    return authenticateToken(req, res, next);
  }
  next();
}, jobController.matchJob);
router.post('/:id/apply', authenticateToken, jobController.applyJob);
router.post('/', authenticateToken, requireRole('RECRUITER', 'ADMIN'), jobController.createJob);

module.exports = router;
