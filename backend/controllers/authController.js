const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup controller
exports.signup = async (req, res) => {
  const { name, email, password, phone, wallet_address, role } = req.body;
  try {
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      user_id: require('crypto').randomBytes(16).toString('hex'),
      name,
      email,
      phone,
      wallet_address,
      password_hash: hash,
      role,
    });

    // Create JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ token, user_id: user.user_id });
  } catch (err) {
    res.status(400).json({ error: 'Signup failed', details: err.message });
  }
};

// Signin controller
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, user_id: user.user_id });
  } catch (err) {
    res.status(400).json({ error: 'Signin failed', details: err.message });
  }
};

// Protected route controller
exports.protected = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: 'Protected route accessed', user: decoded });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};