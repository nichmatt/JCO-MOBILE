const router = require("express").Router();
const { Controller } = require("../controllers/users");

router.get("/users", Controller.findAllUsers);
router.get("/users/:id", Controller.findOneUsers);
router.post("/users", Controller.createUser);
router.delete("/users/:id", Controller.deleteUser);

module.exports = router;
