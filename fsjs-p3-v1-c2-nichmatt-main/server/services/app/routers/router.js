const express = require("express");
const router = express.Router();
const { Controller } = require("../controllers/controller");
const { authentication } = require("../middleware/authentication");

// router.post("/login", Controller.login);

router.get("/items", Controller.readItems);
router.get("/categories", Controller.readCategories);
router.get("/items/:id", Controller.readItemsDetails);

// router.use(authentication);
// router.post("/register", Controller.register);
router.post("/categories", Controller.addCategories);
router.delete("/categories/:id", Controller.deleteCategory);
router.post("/items", Controller.addItems);
router.put("/items/edit/:id", Controller.editItems);
router.delete("/items/:id", Controller.deleteItems);

module.exports = router;
