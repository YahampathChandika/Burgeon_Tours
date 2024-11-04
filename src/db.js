import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yhmpth2000',
  database: 'burgeon'
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database:', err);
  } else {
    console.log('Connected to database!');
  }
});

module.exports = connection;
InnoDB