const { sequelize, User } = require('./models');

async function seedUsers() {
  try {
    await sequelize.sync();

    // Create default users
    const users = [
      { username: 'manager', password: 'password123', role: 'manager' },
      { username: 'employee', password: 'password123', role: 'employee' }
    ];

    for (const userData of users) {
      const existingUser = await User.findOne({ where: { username: userData.username } });
      if (!existingUser) {
        await User.create(userData);
        console.log(`Created user: ${userData.username} (${userData.role})`);
      } else {
        console.log(`User ${userData.username} already exists`);
      }
    }

    console.log('Seeding completed');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seedUsers();