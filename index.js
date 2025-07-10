const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db"); // ✅ MySQL connection
const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = process.env.PORT || 5555;

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", jobRoutes); // ✅ All job APIs

app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Test DB connection
db.getConnection()
  .then(() => {
    console.log("✅ MySQL connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB", err.message);
  });
