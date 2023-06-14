import express, { Request, Response, NextFunction } from 'express';
import { Sequelize } from 'sequelize-typescript';
import { Task } from './models/Task';
import { validate, handleErrors } from './middleware/validation';
import Joi from 'joi';


const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Sequelize configuration
const sequelize = new Sequelize({
  // replace
  database: 'your_database_name',
  dialect: 'postgres',
  // replace
  username: 'your_username',
  // replace
  password: 'your_password',
  storage: ':memory:',
});

// Add models to Sequelize
sequelize.addModels([Task]);

// Synchronize the models with the database
sequelize.sync();

// Define validation schemas
const createTaskSchema = Joi.object({
  title: Joi.string().required(),
});

const updateTaskSchema = Joi.object({
  completed: Joi.boolean().required(),
});

// Define routes with validation middleware
app.get('/tasks', (req: Request, res: Response) => {
  // ...
});

app.post('/tasks', validate(createTaskSchema), (req: Request, res: Response) => {
  // ...
});

app.patch('/tasks/:id', validate(updateTaskSchema), (req: Request, res: Response) => {
  // ...
});

app.delete('/tasks/:id', (req: Request, res: Response) => {
  // ...
});

// Error handler middleware
app.use(handleErrors);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
