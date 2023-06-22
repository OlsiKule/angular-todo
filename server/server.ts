import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import Task from './models/Task';
import { sequelize } from './models/db';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create the required API endpoints

// POST /tasks - Create a new task
app.post(
  '/Tasks',
  [
    body('description').trim().notEmpty().withMessage('Description is required'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { description } = req.body;

      // Create a new task in the database using Sequelize
      const task = await Task.create({ description });

      // Return the created task as a response
      return res.status(201).json(task);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
);

// GET /tasks - Retrieve the list of tasks
app.get('/Tasks', async (req: Request, res: Response) => {
  try {
    // Retrieve all tasks from the database using Sequelize
    const tasks = await Task.findAll();

    // Return the tasks as a response
    return res.json(tasks);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /tasks/:id - Update the status of a task (completed or incomplete)
app.patch('/Tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Find the task in the database by ID using Sequelize
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Update the task's status based on the request body
    const { status } = req.body;
    task.status = status as 'completed' | 'incomplete'; // Type assertion

    // Save the updated task
    await task.save();

    // Return the updated task as a response
    return res.json(task);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


// DELETE /tasks/:id - Delete a task
app.delete('/Tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Find the task in the database by ID using Sequelize
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Delete the task from the database
    await task.destroy();

    // Return a success message as a response
    return res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// Synchronize the models with the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synchronized');
    // Start the server or perform other operations
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
    process.exit(1);
  });
