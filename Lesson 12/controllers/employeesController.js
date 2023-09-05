const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const createNewEmployee = (req, res) => {
  let newEmployee = {
    id: data.employees[data.employees.length - 1].id + 1 || 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  if (!newEmployee.firstname || !newEmployee.lastname)
    return res
      .status(400)
      .json({ message: "First and last names are required" });

  data.setEmployees([...data.employees, newEmployee]);
  console.log(data.employees);
  res.status(201).json(data.employees);
};

const modifyEmployee = (req, res) => {
  const employee = data.employees.find(
    (employee) => parseInt(req.body.id) === employee.id
  );

  if (!employee) {
    return res
      .status(400)
      .json({ message: `The ID ${req.body.id} was not found` });
  }

  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;

  const filteredEmployees = data.employees.filter(
    (employee) => parseInt(req.body.id) !== employee.id
  );
  const unsortedEmployees = [...filteredEmployees, employee];

  data.setEmployees(
    unsortedEmployees.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );

  res.status(201).json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (employee) => parseInt(req.body.id) === employee.id
  );

  if (!employee) {
    return res
      .status(400)
      .json({ message: `The ID ${req.body.id} was not found` });
  }

  const filteredEmployees = data.employees.filter(
    (employee) => parseInt(req.body.id) !== employee.id
  );

  data.setEmployees([...filteredEmployees]);

  res.status(201).json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (employee) => employee.id === parseInt(req.params.id)
  );

  if (!employee) {
    return res
      .status(400)
      .json({ message: `The ID ${req.body.id} was not found` });
  }

  res.status(201).json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  modifyEmployee,
  deleteEmployee,
  getEmployee,
};
