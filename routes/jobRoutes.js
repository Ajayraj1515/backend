const express = require('express');
const { getAllJobs, createJob } = require('../controllers/jobController');
const db = require("../config/db");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const query = "SELECT * FROM jobs";
    const [rows] = await db.execute(query);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

router.post('/', createJob);

module.exports = router;
