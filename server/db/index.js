const { Pool } = require("pg");
require("dotenv").config();
// deployed connection
// const pool = new Pool({
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   port: process.env.PGPORT
// });

// local connection
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

const connection = {
  pool,
  query: (...args) =>
    pool.connect().then((client) =>
      client.query(...args).then((res) => {
        client.release();
        return res.rows;
      })
    ),
};

// module.exports = pool;

module.exports = connection;
