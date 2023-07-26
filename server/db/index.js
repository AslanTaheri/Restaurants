const { Pool } = require("pg");
// import { Pool } from "pg"; // I had to use the commonJS "require" instead of the import
// due to a conflict in using the modules.

const pool = new Pool();
// export const query = (text, params) => pool.query(text, params); // because I had to use the "require" syntax.
module.exports = { query: (text, params) => pool.query(text, params) };
