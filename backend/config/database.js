const Sequelize = require('sequelize');

const sequelize = new Sequelize('todo_db', 'todo_user', 'todo_password', {
  host: 'localhost', //! ou '127.0.0.1'
  dialect: 'mysql',
  port: 3306,
});

module.exports = sequelize;
