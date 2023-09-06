const express = require("express");
const { route } = require("./register");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/", authController.handleLogin);

module.exports = router;
