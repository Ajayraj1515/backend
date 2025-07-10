const db = require("../config/db");

// -------------------- CREATE JOB --------------------
const createJob = async (req, res) => {
  const {
    title,
    company,
    location,
    min_salary,
    max_salary,
    job_type,
    deadline,
    description,
  } = req.body;

  console.log(req.body);

  if (
    !title ||
    !company ||
    !location ||
    !min_salary ||
    !max_salary ||
    !job_type ||
    !deadline ||
    !description
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const sql = `
    INSERT INTO jobs (title, company, location, min_salary, max_salary, job_type, deadline, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    title,
    company,
    location,
    min_salary,
    max_salary,
    job_type,
    deadline,
    description,
  ];

  try {
    const [result] = await db.execute(sql, values);
    return res.status(201).json({
      id: result.insertId,
      title,
      company,
      location,
      min_salary,
      max_salary,
      job_type,
      deadline,
      description,
      createdAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error creating job", error });
  }
};

// -------------------- GET ALL JOBS --------------------
const getAllJobs = async (req, res) => {
  const { search, location, job_type, min_salary, max_salary } = req.query;

  let sql = "SELECT * FROM jobs WHERE 1=1";
  const values = [];

  if (search) {
    sql += " AND title LIKE ?";
    values.push(`%${search}%`);
  }

  if (location) {
    sql += " AND location = ?";
    values.push(location);
  }

  if (job_type) {
    sql += " AND job_type = ?";
    values.push(job_type);
  }

  if (min_salary && max_salary) {
    sql += " AND min_salary BETWEEN ? AND ?";
    values.push(min_salary * 12, max_salary * 12); // assuming monthly salary input
  }

  try {
    const [rows] = await db.execute(sql, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

module.exports = {
  createJob,
  getAllJobs,
};
