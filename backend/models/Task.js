const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Task = sequelize.define('Task', {
    title: { type: DataTypes.STRING, allowNull: false },
    start: { type: DataTypes.DATE, allowNull: false },
    end: { type: DataTypes.DATE, allowNull: false },
    description: DataTypes.TEXT,
    status: { type: DataTypes.ENUM('pending', 'in-progress', 'completed'), defaultValue: 'pending' }
  }, {});

  return Task;
};
