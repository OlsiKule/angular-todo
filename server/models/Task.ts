import { DataTypes, Model } from 'sequelize';
import { sequelize } from './db.js';

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('completed', 'incomplete'),
      defaultValue: 'incomplete',
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
  }
);

sequelize.sync({ force: false }) // <--- This synchronizes the models with the database
  .then(() => {
    console.log('Database synchronized');
    // Start the server or perform any other operations
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
    process.exit(1);
  });

export default Task;
