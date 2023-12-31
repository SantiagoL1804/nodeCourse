const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401); //Unauthorized

  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );

  if (!foundUser) return res.sendStatus(403); // Forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403); //Forbidden
    const roles = Object.values(foundUser.roles);

    const accessToken = jwt.sign(
      { UserInfo: { username: decoded.username, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.json({ accessToken });
  });

  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleRefreshToken };
