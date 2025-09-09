const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('MRVJob', {
    job_id: { type: DataTypes.STRING, primaryKey: true },
    project_id: { type: DataTypes.STRING(64), allowNull: false },
    bundle_id: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'pending' },
    results_json: DataTypes.JSONB,
    report_pdf_url: DataTypes.TEXT,
    merkle_root: DataTypes.TEXT,
    ipfs_cid: DataTypes.TEXT,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    completed_at: DataTypes.DATE
  }, {
    tableName: 'mrv_jobs',
    timestamps: false
  });
};