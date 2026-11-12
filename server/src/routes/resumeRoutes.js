const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const resumeController = require('../controllers/resumeController');
const { authenticateToken } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `resume_${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and TXT files are supported.'));
    }
  }
});

// Allow both authenticated and quick test mode
router.post('/analyze', (req, res, next) => {
  const token = req.headers['authorization'];
  if (token) {
    return authenticateToken(req, res, next);
  }
  next();
}, upload.single('resumeFile'), resumeController.analyzeResume);

module.exports = router;
