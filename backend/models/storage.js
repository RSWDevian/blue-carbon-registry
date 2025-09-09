const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('StorageLink', {
    storage_id: { type: DataTypes.STRING, primaryKey: true },
    bundle_id: { type: DataTypes.STRING, allowNull: false },
    minio_url: DataTypes.TEXT,
    ipfs_cid: DataTypes.TEXT,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'storage_links',
    timestamps: false
  });
};