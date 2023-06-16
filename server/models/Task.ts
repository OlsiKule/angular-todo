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
  }
);

// Synchronize the models with the database
sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
});

export default Task;
