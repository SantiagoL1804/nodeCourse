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
  };
};

module.exports = verifyRoles;
