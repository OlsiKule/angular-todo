// db.js
// import { Sequelize } from 'sequelize';
const Sequelize = require("sequelize");

// export
const sequelize = new Sequelize('postgres', 'postgres', 'useradmin', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.authenticate().then(() => {
  console.log("Well done! Connection successful!")
}).catch((error) => {
  console.log("Error connecting to database.");
})

console.log("Another task");


