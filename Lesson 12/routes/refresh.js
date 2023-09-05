const express = require("express");
const { route } = require("./register");
const router = express.Router();

const refreshTokenController = require("../controllers/refreshTokenController");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
