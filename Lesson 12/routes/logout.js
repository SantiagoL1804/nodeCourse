const express = require("express");
const { route } = require("./register");
const router = express.Router();

const logOutControllerController = require("../controllers/logOutController");

router.get("/", logOutControllerController.handleLogOut);

module.exports = router;
