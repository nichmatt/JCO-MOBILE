const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4001;
const routes = require("./routers");
const { mongoConnect } = require("./config/mongoConnection");
const { User } = require("./model/user");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(routes);

mongoConnect().then(() => {
  app.listen(port, () => console.log(`Apps is listening at port ${port}`));
});
