const fs = require('fs');
const pdfParse = require('pdf-parse');
const aiService = require('../services/aiService');
const db = require('../config/db');

exports.analyzeResume = async (req, res) => {
  try {
    let resumeText = '';

    if (req.file) {
      if (req.file.mimetype === 'application/pdf') {
        const dataBuffer = fs.readFileSync(req.file.path);
        const pdfData = await pdfParse(dataBuffer);
        resumeText = pdfData.text;
      } else {
        resumeText = fs.readFileSync(req.file.path, 'utf8');
      }
    } else if (req.body.resumeText) {
      resumeText = req.body.resumeText;
    } else {
      return res.status(400).json({ error: 'Please provide a resume file (PDF/Text) or paste resumeText.' });
    }

    const targetRole = req.body.targetRole || (req.user ? req.user.targetRole : 'Full Stack AI Engineer');
    
    // Invoke Resume Intelligence Agent via AI Service
    const analysis = await aiService.analyzeResume(resumeText, targetRole);

    // Save parsed result in candidate record if authenticated
    if (req.user) {
      db.resumes.push({
        userId: req.user.id,
        filename: req.file ? req.file.originalname : 'Pasted Text',
        analysis,
        uploadedAt: new Date().toISOString()
      });
    }

    return res.json({
      success: true,
      analysis
    });
  } catch (err) {
    console.error('Error analyzing resume:', err);
    return res.status(500).json({ error: 'Failed to analyze resume with AI Agent: ' + err.message });
  }
};
