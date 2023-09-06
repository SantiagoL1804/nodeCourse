const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createNewEmployee,
  modifyEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesController");
<<<<<<< HEAD

const ROLES_LIST = require("../../config/roles_list");

=======
const ALLOWED_ROLES = require("../../config/roles_list");
>>>>>>> a676459fb6081902ea09aa3d71bfd3d1f59040fa
const verifyRoles = require("../../middlewares/verifyRoles");

router
  .route("/")
  .get(getAllEmployees)
<<<<<<< HEAD
  .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), modifyEmployee)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteEmployee);
=======
  .post(
    verifyRoles(ALLOWED_ROLES.Admin, ALLOWED_ROLES.Editor),
    createNewEmployee
  )
  .put(verifyRoles(ALLOWED_ROLES.Admin, ALLOWED_ROLES.Editor), modifyEmployee)
  .delete(verifyRoles(ALLOWED_ROLES.Admin), deleteEmployee);
>>>>>>> a676459fb6081902ea09aa3d71bfd3d1f59040fa

router.route("/:id").get(getEmployee);

module.exports = router;
