const router =  require("express").Router();
const {
  deleteEarthquake,
  getEarthquake,
  postEarthquake,
  updateEarthquake,
} = require("../controller/Earthquake.js");

router.get("/", getEarthquake);
router.put("/update/:id", updateEarthquake);
router.delete("/delete/:id", deleteEarthquake);
router.post("/post", postEarthquake);

module.exports = router;
