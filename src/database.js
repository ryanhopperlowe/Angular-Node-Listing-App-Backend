import mysql from 'mysql';

let connection;

export const db = {
  connect: () => {
    connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      socketPath: process.env.DB_SOCKET
    });

    connection.connect();
  },
  query: (queryString, escapedValues) => 
    new Promise((res, rej) => {
      connection.query(queryString, escapedValues, (error, results, field) => {
        if (error) rej(error);
        res({ results, field })
      })
    }),
  end: () => connection.end()
}
