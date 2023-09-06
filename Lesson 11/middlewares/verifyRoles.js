<<<<<<< HEAD
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (req?.roles) return res.sendStatus(401); // Unauthorized

    const rolesArray = [...allowedRoles];
    console.log(rolesArray);
    console.log(req.roles);

    const result = req.roles
      .map((role) => rolesArray.includes(role))
      .find((value) => value === true);

    if (!result) return res.sendStatus(401); // Unauthorized

    next();
=======
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
>>>>>>> a676459fb6081902ea09aa3d71bfd3d1f59040fa
  };
};

module.exports = verifyRoles;
