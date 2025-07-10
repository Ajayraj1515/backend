const db = require("../config/db");

const insertJob = (jobData, callback) => {
  const {
    title,
    company,
    location,
    min_salary,
    max_salary,
    job_type,
    deadline,
    description,
  } = jobData;

  const sql = `
    INSERT INTO jobs (
      title, company, location, min_salary, max_salary,
      job_type, deadline, description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, company, location, min_salary, max_salary, job_type, deadline, description], callback);
};

module.exports = { insertJob };
