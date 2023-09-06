const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

require("dotenv").config();

const fsPromises = require("fs").promises;
const path = require("path");

const handleLogOut = async (req, res) => {
  //! ON CLIENT ALSO DELETE THE ACCESS TOKEN

  //Is refreshToken in http cookies?
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); //Successful but no content

  const refreshToken = cookies.jwt;

  //Is refreshToken in db?
  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  }

  //Delete refreshToken in db
  const otherUsers = usersDB.users.filter(
    (person) => person.refreshToken !== foundUser.refreshToken
  );

  const loggedOutUser = {
    ...foundUser,
    refreshToken: "",
  };

  usersDB.setUsers([...otherUsers, loggedOutUser]);

  await fsPromises.writeFile(
    path.join(__dirname, "..", "model", "users.json"),
    JSON.stringify(usersDB.users)
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true }); // secure:true - only servers inhttps
  res.sendStatus(204);

  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleLogOut };
