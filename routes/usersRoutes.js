const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validateUsers = require("../middlewares/validateUsers");

router.post("/login", userController.login);
router.get("/users", userController.getUsers);
router.post("/users", userController.createUser);
router.put("/users/:id", validateUsers, userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
