const express = require('express');
const jwt = require('jsonwebtoken');

module.exports = (Task, User) => {
  const router = express.Router();

  const auth = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) { res.sendStatus(403); }
  };

  router.use(auth);

  router.get('/', async (req, res) => {
    let tasks;
    if (req.user.role === 'manager') {
      tasks = await Task.findAll({ include: User });
    } else {
      tasks = await Task.findAll({ where: { userId: req.user.id } });
    }
    res.json(tasks);
  });

  router.post('/', async (req, res) => {
    const task = await Task.create({ ...req.body, userId: req.user.id });
    res.json(task);
  });

  router.put('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.sendStatus(404);
    await task.update(req.body);
    res.json(task);
  });

  router.delete('/:id', async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.sendStatus(404);
    await task.destroy();
    res.json({ message: 'Deleted' });
  });

  return router;
};
