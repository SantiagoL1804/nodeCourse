const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcryptjs");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  //Check if username and password were introduced
  if (!user || !pwd)
    return res.status(400).json({ message: "Username and password required." });

  const foundUser = usersDB.users.find((person) => person.username === user);

  if (foundUser) return res.status(409);
  try {
    //encrypt the pasword
    // const hashedPwd = await bcrypt.hash(pwd, 10);

    let newUser = {
      username: user,
      roles: { User: 2001 },
    };

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(pwd, salt, async function (err, hash) {
        // Store hash in your password DB.
        if (err) console.log(err);
        newUser = { ...newUser, password: hash };
        usersDB.setUsers([...usersDB.users, newUser]);

        await fsPromises.writeFile(
          path.join(__dirname, "..", "model", "users.json"),
          JSON.stringify(usersDB.users)
        );

        res.status(201).json({
          success: `New user ${newUser.username} successfully created`,
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { handleNewUser };
