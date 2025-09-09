const { Sequelize } = require('sequelize');

// Create Sequelize instance using the DATABASE_URL from .env
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

// Import all models
const User = require('./user')(sequelize);
const Project = require('./project')(sequelize);
const FieldBundle = require('./fieldBundle')(sequelize);
const StorageLink = require('./storage')(sequelize);
const MRVJob = require('./mrvJob')(sequelize);
const Verification = require('./verification')(sequelize);
const BlockchainCommit = require('./blockchainCommit')(sequelize);

// Define associations here if needed
// Example: Project.belongsTo(User, { foreignKey: 'owner_id' });

module.exports = {
  sequelize,
  User,
  Project,
  FieldBundle,
  StorageLink,
  MRVJob,
  Verification,
  BlockchainCommit,
};