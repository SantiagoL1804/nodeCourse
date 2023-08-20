const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/employees.json");

console.log(typeof data.employees[0].id);

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    data.employees.push({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.json(data.employees);
  })
  .put((req, res) => {
    const modifiedEmployees = data.employees.map((employee) => {
      if (employee.id === req.body.id) {
        console.log(employee);
        employee.firstname = req.body.firstname;
        employee.lastname = req.body.lastname;
      }
      return employee;
    });

    res.json(modifiedEmployees);
  })
  .delete((req, res) => {
    const filteredEmployees = data.employees.filter(
      (employee) => employee.id !== req.body.id
    );
    res.json(filteredEmployees);
  });

router.route("/:id").get((req, res) => {
  const foundEmployee = data.employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  console.log(typeof parseInt(req.params.id), foundEmployee);
  res.json(foundEmployee);
});

module.exports = router;
