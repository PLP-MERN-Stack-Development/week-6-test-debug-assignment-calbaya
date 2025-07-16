const express = require('express');
const Bug = require('../models/Bug');
const router = express.Router();

router.get('/', async (req, res) => {
  const bugs = await Bug.find();
  res.json(bugs);
});

router.post('/', async (req, res) => {
  const bug = new Bug(req.body);
  await bug.save();
  res.status(201).json(bug);
});

router.put('/:id', async (req, res) => {
  const updated = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);
  res.status(204).end();
});

module.exports = router;