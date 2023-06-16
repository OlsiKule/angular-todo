import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { body, validationResult } from 'express-validator';

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create the required API endpoints

// POST /tasks - Create a new task
app.post(
  '/tasks',
  [
    body('description').trim().notEmpty().withMessage('Description is required'),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Handle creating a new task
  }
);

// GET /tasks - Retrieve the list of tasks
app.get('/tasks', (req: Request, res: Response) => {
  // Handle retrieving tasks
});

// PATCH /tasks/:id - Update the status of a task (completed or incomplete)
app.patch('/tasks/:id', (req: Request, res: Response) => {
  // Handle updating a task's status
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', (req: Request, res: Response) => {
  // Handle deleting a task
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});
