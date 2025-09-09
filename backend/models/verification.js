const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Verification', {
    verification_id: { type: DataTypes.STRING, primaryKey: true },
    job_id: { type: DataTypes.STRING, allowNull: false },
    verifier_id: { type: DataTypes.STRING, allowNull: false },
    approval: DataTypes.BOOLEAN,
    verifier_signature: DataTypes.TEXT,
    comments: DataTypes.TEXT,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'verifications',
    timestamps: false
  });
};