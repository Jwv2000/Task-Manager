const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize, User, Task } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth')(User));
app.use('/tasks', require('./routes/tasks')(Task, User));
// Add other routes as needed

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));
