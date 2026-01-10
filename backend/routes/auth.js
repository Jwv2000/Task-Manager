const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = (User) => {
  const router = express.Router();

  router.post('/register', async (req, res) => {
    try {
      const user = await User.create(req.body);
      res.json({ message: 'User created', user });
    } catch (err) { res.status(400).json({ error: err.message }); }
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, role: user.role });
  });

  return router;
};
