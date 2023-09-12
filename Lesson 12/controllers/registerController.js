const User = require("../model/User");

const bcrypt = require("bcryptjs");

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  //Check if username and password were introduced
  if (!user || !pwd)
    return res.status(400).json({ message: "Username and password required." });

  const foundUser = await User.findOne({ username: user }).exec();

  if (foundUser) return res.status(409);
  try {
    //encrypt the pasword
    // const hashedPwd = await bcrypt.hash(pwd, 10);

    let newUser = {
      username: user,
    };

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(pwd, salt, async function (err, hash) {
        //Create and Store hash in your password DB.
        if (err) console.log(err);
        newUser = await User.create({ ...newUser, password: hash });

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
