const { pool } = require("../models/db.js");

const getEarthquake = async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM earthquake");
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error("Error retrieving data from the database", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
  next()
};

const updateEarthquake = async (req, res, next) => {
  const { id } = req.params;
  const {
    location,
    latitude,
    longitude,
    magnitude,
    depth,
    date_time,
    description,
  } = req.body;

  try {
    const query = `
      UPDATE earthquake
      SET location = $1,
          latitude = $2,
          longitude = $3,
          magnitude = $4,
          depth = $5,
          date_time = $6,
          description = $7
      WHERE id = $8`;

    await pool.query(query, [
      location,
      latitude,
      longitude,
      magnitude,
      depth,
      date_time,
      description,
      id,
    ]);

    res.status(200).send({ message: "Update successful" });
  } catch (error) {
    console.error("Error updating data in the database", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
  next()
};

const deleteEarthquake = async (req, res, next) => {
  const { id } = req.params;
  try {
    await pool.query(`DELETE FROM earthquake WHERE id = $1`, [id]);
    res.status(200).send({ message: "Delete successful" });
  } catch (error) {
    console.error("Error deleting data from the database", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
  next()
};
const postEarthquake = async (req, res, next) => {
  const {
    location,
    latitude,
    longitude,
    magnitude,
    depth,
    date_time,
    description,
  } = req.body;
  try {
    await pool.query(
      `INSERT INTO earthquake (location, latitude, longitude, magnitude, depth, description, date_time)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [location, latitude, longitude, magnitude, depth, description, date_time]
    );
    res.status(200).send("Data inserted successfully");
  } catch (error) {
    console.error("Error inserting data:", error.message);
    res.status(500).send("Error inserting data");
  }
  next()
};
module.exports = {
  getEarthquake,
  updateEarthquake,
  deleteEarthquake,
  postEarthquake,
};
