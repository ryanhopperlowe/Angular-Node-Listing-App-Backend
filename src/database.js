import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hapi-server',
  password: 'abc123!',
  database: 'buy-and-sell'
});

export const db = {
  connect: () => connection.connect(),
  query: (queryString, escapedValues) => 
    new Promise((res, rej) => {
      connection.query(queryString, escapedValues, (error, results, field) => {
        if (error) rej(error);
        res({ results, field })
      })
    }),
  end: () => connection.end()
}
