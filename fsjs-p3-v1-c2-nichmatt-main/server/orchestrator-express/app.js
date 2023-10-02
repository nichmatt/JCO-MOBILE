const { createClient } = require("redis");
const Redis = require("redis");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const { initializeRedis } = require("./redisConfig/redisConfig");

const APP_SERVER_URL = "http://localhost:4002";
const USERS_SERVER_URL = "http://localhost:4001";

// const redis = new Redis(
//   14482,
//   "redis-14482.c84.us-east-1-2.ec2.cloud.redislabs.com"
// );

const client = createClient({
  password: "j5wkejECBkgeSI52abM5s9zofZc9e5X8",
  socket: {
    host: "redis-14482.c84.us-east-1-2.ec2.cloud.redislabs.com",
    port: 14482,
  },
});

client.connect();

// const client = initializeRedis();

const app = express();
const port = 4000;

app
  .use(cors())
  // .use(morgan("tiny"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .get("/users/:id", async (req, res, next) => {
    try {
      const { id } = req.params;
      let user = await client.get("user");
      console.log(user, "ini userChacenya");
      if (user) {
        const { data } = await axios.get(`${USERS_SERVER_URL}/users/${id}`);
        res.status(200).json(JSON.parse(user));
      } else {
        const { data } = await axios.get(`${USERS_SERVER_URL}/users/${id}`);
        await client.set("user", JSON.stringify(data));
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  })
  .get("/users", async (req, res, next) => {
    try {
      const { data } = await axios.get(`${USERS_SERVER_URL}/users`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  })
  .post("/users", async (req, res, next) => {
    try {
      // console.log(req.body, "ini req.body nya ");
      const { username, email, password, role, phoneNumber, address } =
        req.body;

      console.log(username, email, password, role, phoneNumber, address);
      const { data } = await axios({
        method: "post",
        url: USERS_SERVER_URL + "/users",
        data: {
          username,
          email,
          password,
          role,
          phoneNumber,
          address,
        },
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        error:
          "Something wicked happened, but error handler not implemented yet!",
      });
    }
  })
  .delete("/users/:id", async (req, res) => {
    try {
      console.log();
      const { id } = req.params;
      console.log(id, "id req.params delete");
      const { data } = await axios.delete(`${USERS_SERVER_URL}/users/${id}`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        error:
          "Something wicked happened, but error handler not implemented yet!",
      });
    }
  })
  .get("/items", async (req, res) => {
    try {
      const { data } = await axios.get(`${APP_SERVER_URL}/items`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  })
  .get("/items/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { data } = await axios.get(`${APP_SERVER_URL}/items/${id}`);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({
        statusCode: 500,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  })
  .post("/items", async (req, res) => {
    try {
      const { name, description, price, imgUrl, categoryId, ingredients } =
        req.body;

      const { data } = await axios({
        method: "post",
        url: APP_SERVER_URL + "/items",
        data: {
          name,
          description,
          price,
          imgUrl,
          categoryId,
          ingredients,
        },
      });
      res.status(201).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        error:
          "Something wicked happened, but error handler not implemented yet !",
      });
    }
  })

  .put("/items/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, imgUrl, categoryId, ingredients } =
      req.body;
    console.log(id, name);
    const { data } = await axios({
      method: "put",
      url: APP_SERVER_URL + "/items/edit/" + id,
      data: {
        name,
        description,
        price,
        imgUrl,
        categoryId,
        ingredients,
      },
    });
    res.status(201).json(data);
  })

  .delete("/items/:id", async (req, res) => {
    try {
      console.log();
      const { id } = req.params;
      console.log(id, "id req.params delete");
      const { data } = await axios.delete(`${APP_SERVER_URL}/items/${id}`);
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        statusCode: 500,
        error:
          "Something wicked happened, but error handler not implemented yet!",
      });
    }
  })

  .listen(port, () => console.log(`Orchestrator on ${port}`));
