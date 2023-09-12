const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    res.status(400).json({ message: "Username and password are required" });

  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser)
    res.status(401).json({ message: `User ${user} does not exist` });
  //evaluate password
  // const match = await bcrypt.compare(pwd, foundUser.password);
  bcrypt.compare(pwd, foundUser.password, async function (err, match) {
    if (err) console.error(err);
    if (match) {
      //!CREATE JWTs
      const roles = Object.values(foundUser.roles);

      const accessToken = jwt.sign(
        { UserInfo: { username: foundUser.username, roles } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );

      console.log("chau");

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );

      //! SAVING REFRESH TOKEN WITH CURRENT USER
      const otherUsers = usersDB.users.filter(
        (person) => person.username !== foundUser.username
      );
      const currentUser = { ...foundUser, refreshToken };
      usersDB.setUsers([...otherUsers, currentUser]);

      await fsPromises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(usersDB.users)
      );

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ accessToken });
    } else {
      console.log("unauthorized pass");
      res.sendStatus(401); // Unauthorized
    }
  });

  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogin };
