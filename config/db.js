const mysql = require("mysql2/promise");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.DB_HOST,      // e.g. localhost
  user: process.env.DB_USER,      // e.g. root
  password: process.env.DB_PASS,  // your MySQL password
  database: process.env.DB_NAME,  // e.g. cybermind_jobs
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Optional test connection
db.getConnection()
  .then(() => console.log("✅ MySQL DATABASE connected"))
  .catch((err) => console.error("❌ DB connection failed:", err.message));

module.exports = db;
