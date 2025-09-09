const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('BlockchainCommit', {
    commit_id: { type: DataTypes.STRING, primaryKey: true },
    project_id: { type: DataTypes.STRING(64), allowNull: false },
    job_id: { type: DataTypes.STRING, allowNull: false },
    merkle_root: { type: DataTypes.TEXT, allowNull: false },
    ipfs_cid: { type: DataTypes.TEXT, allowNull: false },
    verifier_signature: { type: DataTypes.TEXT, allowNull: false },
    tx_hash: DataTypes.TEXT,
    committed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'blockchain_commits',
    timestamps: false
  });
};