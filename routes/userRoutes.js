const { SignUp, Login } = require("../controller/Authtorization.js");
const {
  deleteUser,
  editUserRole,
  getAllUsersAdmin,
  getAndEditUserInfo,
  getUser,
  getUserProfile,
} = require("../controller/userController.js");
const router = require("express").Router();

router.get("/home", getUser);
router.get("/admin", getAllUsersAdmin);
router.get("/users/:userId/edit", getAndEditUserInfo);
router.get("/user/:id/profile", getUserProfile);
router.post("/signup", SignUp);
router.post("/login", Login);
router.post("/users/:userId/edit", editUserRole);
router.delete("/users/:userId/delete", deleteUser);

module.exports = router;
