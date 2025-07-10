const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = process.env.PORT || 5555;
const allowedOrigins = process.env.CLIENT_URL.split(",");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("Server is running...");
});


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
