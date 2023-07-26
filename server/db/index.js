const { Pool } = require("pg");
// import { Pool } from "pg"; // I had to use the "require";

const pool = new Pool();
// export const query = (text, params) => pool.query(text, params); // because I had to use the "require" syntax.
module.exports = { query: (text, params) => pool.query(text, params) };
