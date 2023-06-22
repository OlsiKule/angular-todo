import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { validationResult } from 'express-validator';
import Task from './models/Task';
import { sequelize } from './models/db';

const app = express();
app.use(bodyParser.json());

app.post('/Tasks', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { description } = req.body;

    const task = await Task.create({ description });

    return res.status(201).json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Use the same Sequelize instance as in your server code
beforeAll(async () => {
  await sequelize.sync();
});

// Cleanup the database after each test
afterEach(async () => {
  await Task.destroy({ truncate: true });
});

// Close the Sequelize connection after all tests
afterAll(async () => {
  await sequelize.close();
});

describe('POST /Tasks', () => {
  test('creates a new task and returns it as a response', async () => {
    const description = 'Test task';

    const response = await request(app)
      .post('/Tasks')
      .send({ description });

    expect(response.status).toBe(201);
    expect(response.body.description).toBe(description);

    // Verify the task is stored in the database
    const task = await Task.findOne({ where: { description } });
    expect(task).toBeDefined();
    expect(task?.description).toBe(description);
  });

  test('returns an error response when description is empty', async () => {
    const response = await request(app).post('/Tasks').send({ description: '' });

    expect(response.status).toBe(400);
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe('Description is required');

    // Verify no task is stored in the database
    const tasks = await Task.findAll();
    expect(tasks).toHaveLength(0);
  });

});
