const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const {
  deleteEarthquake,
  getEarthquake,
  postEarthquake,
  updateEarthquake,
} = require("./controller/Earthquake.js");
const { SignUp, Login } = require("./controller/Authtorization.js");

const {
  deleteUser,
  editUserRole,
  getAllUsersAdmin,
  getAndEditUserInfo,
  getUser,
  getUserProfile,
} = require("./controller/userController.js");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes earthquakes
app.get("/", getEarthquake);
app.put("/update/:id", updateEarthquake);
app.delete("/delete/:id", deleteEarthquake);
app.post("/post", postEarthquake);
// users
app.get("/home/:id", getUser);
app.get("/admin", getAllUsersAdmin);
app.get("/user/:id/profile", getUserProfile);
app.get("/users/:userId/edit", getAndEditUserInfo);
app.post("/users/:userId/edit", editUserRole);
app.post("/signup", SignUp);
app.post("/login", Login);
app.delete("/users/:userId/delete", deleteUser);

app.listen(PORT, () => {
  console.log(` server on ${PORT}`);
});
