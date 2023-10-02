const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 4002;
const router = require("./routers/router");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Listening on Port" + PORT);
});
