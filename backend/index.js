require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

// Import routers
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const ingestionRoutes = require('./routes/ingestion');
// const mrvRoutes = require('./routes/mrv');
const verificationRoutes = require('./routes/verification');
// const blockchainRoutes = require('./routes/blockchain');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Express API is running.' });
});

// Register routers
app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/ingestion', ingestionRoutes);
// app.use('/mrv', mrvRoutes);
app.use('/verification', verificationRoutes);
// app.use('/blockchain', blockchainRoutes);

const PORT = process.env.PORT || 8000;

// Connect to DB and start server
sequelize.authenticate().then(() => {
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});