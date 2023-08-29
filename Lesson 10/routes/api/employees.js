const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  createNewEmployee,
  modifyEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesController");

router
  .route("/")
  .get(getAllEmployees)
  .post((req, res) => createNewEmployee(req, res))
  .put((req, res) => modifyEmployee(req, res))
  .delete((req, res) => deleteEmployee(req, res));

router.route("/:id").get((req, res) => getEmployee(req, res));

module.exports = router;
