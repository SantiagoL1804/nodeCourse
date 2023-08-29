const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origins = req.headers.origin;
  if (allowedOrigins.includes(origins)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
