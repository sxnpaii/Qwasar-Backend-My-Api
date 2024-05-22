const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/userRoutes.js");
const earthquakeRoutes = require("./routes/earthquakeRoutes.js");
require("dotenv").config();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
app.use("/",userRoutes);
app.use("/earthquakes/",  earthquakeRoutes);



app.listen(PORT, () => {
  console.log(` server on ${PORT}`);
});
