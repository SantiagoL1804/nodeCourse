const usersDB = {
  users: require("../model/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req?.roles) return res.sendStatus(401);

      const rolesArray = [...allowedRoles];

      const result = req.roles
        .map((role) => rolesArray.includes(role))
        .find((value) => value === true);

      if (!result) return res.sendStatus(401);

      next();
    } catch (err) {
      console.error(err);
    }
  };
};

module.exports = verifyRoles;
