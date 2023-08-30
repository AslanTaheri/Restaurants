const { Pool } = require("pg");
// import { Pool } from "pg"; // I had to use the commonJS "require" instead of the import
// due to a conflict in using the modules.

const pool = new Pool();
// export const query = (text, params) => pool.query(text, params); // because I had to use the "require" syntax.
module.exports = { query: (text, params) => pool.query(text, params) };

// ssl: {
//   rejectUnauthorized: false, // If your SSL certificate is self-signed
//   minVersion: "TLSv1.2", // Set the minimum TLS version
//   ciphers: [
//     // List of supported cipher suites
//     "TLS_AES_128_GCM_SHA256",
//     "TLS_AES_256_GCM_SHA384",
//     "TLS_CHACHA20_POLY1305_SHA256",
//     "TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
//     "TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256",
//     "TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384",
//   ].join(":"),
// },
