const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd)
    res.status(400).json({ message: "Username and password are required" });

  const foundUser = usersDB.users.find((person) => person.username === user);

  if (!foundUser)
    res.status(401).json({ message: `User ${user} does not exist` });
  //evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    //CREATE JWTs
    res.json({ Success: `User ${user} is logged in!` });
  } else {
    console.log("unauthorized pass");
    res.sendStatus(401); // Unauthorized
  }
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogin };
