const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createNewEmployee,
  modifyEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesController");
const ALLOWED_ROLES = require("../../config/roles_list");
const verifyRoles = require("../../middlewares/verifyRoles");

router
  .route("/")
  .get(getAllEmployees)
  .post(
    verifyRoles(ALLOWED_ROLES.Admin, ALLOWED_ROLES.Editor),
    createNewEmployee
  )
  .put(modifyEmployee)
  .delete(deleteEmployee);

router.route("/:id").get(getEmployee);

module.exports = router;
