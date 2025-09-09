const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('FieldBundle', {
    bundle_id: { type: DataTypes.STRING, primaryKey: true },
    project_id: { type: DataTypes.STRING(64), allowNull: false },
    submitted_by: { type: DataTypes.STRING, allowNull: false },
    plots: DataTypes.JSONB,
    soil_entries: DataTypes.JSONB,
    photos: DataTypes.ARRAY(DataTypes.TEXT),
    drone_metadata: DataTypes.JSONB,
    signature: DataTypes.TEXT,
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'field_bundles',
    timestamps: false
  });
};