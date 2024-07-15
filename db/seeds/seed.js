const format = require('pg-format');
const db = require('../connection');
const {
  convertTimestampToDate,
  createRef,
  formatComments,
} = require('./utils');

const seed = ({ tasksData, userData  }) => {
  return db
    .query(`DROP TABLE IF EXISTS tasks;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
    

      const usersTablePromise = db.query(`
      CREATE TABLE users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR ,
        name VARCHAR NOT NULL
      
      );`);
      const tasksTablePromise = db.query(`
        CREATE TABLE tasks(
        task_id SERIAL PRIMARY KEY,
        name VARCHAR,
          description VARCHAR ,
          status VARCHAR,
          user_id INT REFERENCES users(user_id)
        );`);

      return Promise.all([tasksTablePromise, usersTablePromise]);
    })
    
    .then(() => {
        const insertUsersQueryStr = format(
            'INSERT INTO users (username, name) VALUES %L;',
            userData.map(({ username, name }) => [
              username,
              name
            ])
          );
          const usersPromise = db.query(insertUsersQueryStr);


      const insertTasksQueryStr = format(
        'INSERT INTO tasks (name, description,status, user_id) VALUES %L;',
        tasksData.map(({ name, description, status,user_id}) => [name, description, status ,user_id])
      );
      const tasksPromise = db.query(insertTasksQueryStr);

      

      return Promise.all([usersPromise, tasksPromise]);
    })
    
};

module.exports = seed;
