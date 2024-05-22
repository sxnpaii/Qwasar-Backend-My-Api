const { pool } = require("../models/db.js");
const Login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const results = await pool.query(
      `SELECT * FROM users WHERE username = $1 AND password = $2`,
      [username, password]
    );
    const user = results.rows[0];
    if (user) {
      if (user.role) {
        res.json({ message: "admin user", username: user.username });
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
  next();
};

const SignUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [username, email, password]
    );
    if (result.rows.length > 0) {
      res.status(200).json("Information uploaded successfully");
    } else {
      res.status(400).send("Error uploading information");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  next();
};

module.exports = { Login, SignUp };
