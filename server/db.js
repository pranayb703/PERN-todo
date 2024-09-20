const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "flint3020",
  host: "localhost",
  database: "permtodo",
  port: 5432,
});

module.exports = pool;
