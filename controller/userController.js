const { pool } = require("../models/db.js");

const getUser = async ({ query }, res, next) => {
  try {
    const { rows } = pool.query(`SELECT * FROM users WHERE id = ${query.id}`);
    res.status(200).json("main page", { user: rows[0].username });
  } catch (error) {
    console.error(error);
  }
  next();
};

const getUserProfile = async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
      userId,
    ]);
    const user = result.rows[0];
    if (!user) {
      return res.status(404).send("User not found");
    } 
    res.status(200).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  next();
};

const getAllUsersAdmin = async (req, res, next) => {
  try {
    const { rows } = await pool.query(`SELECT * FROM users`);
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error retrieving data from the database", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
  next();
};

const getAndEditUserInfo = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const { rows } = await pool.query(
      `SELECT * FROM users WHERE id = ${userId}`
    );

    res.status(200).json("edit users information", rows[0]);
  } catch (error) {
    console.error(error);
  }
  next();
};
const editUserRole = async (req, res, next) => {
  const userId = req.params.userId;
  const { role } = req.body;
  try {
    await pool.query("UPDATE users SET role = $1 WHERE id = $2", [
      role,
      userId,
    ]);
    res.status(200).json("User's role edited successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  next();
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    await pool.query(`DELETE FROM users WHERE id = $1`, [userId]);
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
  next();
};

module.exports = {
  getUser,
  getAllUsersAdmin,
  getAndEditUserInfo,
  editUserRole,
  deleteUser,
  getUserProfile,
};
