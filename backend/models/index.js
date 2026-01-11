const sequelize = require('../config/database');
const User = require('./user')(sequelize);
const Task = require('./Task')(sequelize);

// Associations
Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

module.exports = { sequelize, User, Task };