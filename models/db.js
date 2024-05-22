const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.POSTGRESQL_ADDON_HOST,
  user: process.env.POSTGRESQL_ADDON_USER,
  port: process.env.POSTGRESQL_ADDON_PORT,
  password: process.env.POSTGRESQL_ADDON_PASSWORD,
  database: process.env.POSTGRESQL_ADDON_DB,
});

module.exports = { pool };
