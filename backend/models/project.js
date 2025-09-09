const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Project', {
    project_id: { type: DataTypes.STRING(64), primaryKey: true },
    owner_id: { type: DataTypes.STRING, allowNull: false },
    project_name: { type: DataTypes.STRING, allowNull: false },
    description: DataTypes.TEXT,
    polygon: { type: DataTypes.GEOMETRY('POLYGON', 4326), allowNull: false },
    tenure_docs: DataTypes.ARRAY(DataTypes.TEXT),
    method_id: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: 'registered' },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    tableName: 'projects',
    timestamps: false
  });
};