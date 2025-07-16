const request = require('supertest');
const express = require('express');
const bugRoutes = require('../routes/bugRoutes');

const app = express();
app.use(express.json());
app.use('/api/bugs', bugRoutes);

jest.mock('../models/Bug', () => ({
  find: jest.fn().mockResolvedValue([{ title: 'Bug 1', description: 'desc', status: 'open' }]),
}));

const Bug = require('../models/Bug');

test('GET /api/bugs should return list of bugs', async () => {
  const res = await request(app).get('/api/bugs');
  expect(res.statusCode).toBe(200);
  expect(res.body).toEqual([{ title: 'Bug 1', description: 'desc', status: 'open' }]);
});