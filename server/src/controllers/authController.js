const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const { JWT_SECRET } = require('../middleware/authMiddleware');

exports.register = (req, res) => {
  const { email, password, fullName, role, targetRole } = req.body;

  if (!email || !password || !fullName) {
    return res.status(400).json({ error: 'Email, password, and full name are required.' });
  }

  const existing = db.findUserByEmail(email);
  if (existing) {
    return res.status(409).json({ error: 'An account with this email already exists.' });
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = db.createUser({
    email,
    passwordHash,
    fullName,
    role: role || 'STUDENT',
    targetRole: targetRole || 'Full Stack AI Engineer'
  });

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  return res.status(201).json({
    message: 'Registration successful',
    user: safeUser,
    token
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const user = db.findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials. Please verify your email and password.' });
  }

  const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

  const safeUser = { ...user };
  delete safeUser.passwordHash;

  return res.json({
    message: 'Login successful',
    user: safeUser,
    token
  });
};

exports.getMe = (req, res) => {
  const safeUser = { ...req.user };
  delete safeUser.passwordHash;
  return res.json({ user: safeUser });
};

exports.updateProfile = (req, res) => {
  const { targetRole, skills, headline, bio } = req.body;
  const user = req.user;

  if (targetRole) user.targetRole = targetRole;
  if (headline) user.headline = headline;
  if (bio) user.bio = bio;
  if (skills) {
    db.updateUserSkills(user.id, skills);
  }

  const safeUser = { ...user };
  delete safeUser.passwordHash;
  return res.json({ message: 'Profile updated successfully', user: safeUser });
};
