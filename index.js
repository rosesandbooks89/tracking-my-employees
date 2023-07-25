const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    database: "employee_db",
    password: "rose89",
  },
  console.log("Connected to the employee_db database.")
);
//function to the start menu and the move to next menu
function init() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "startMenu",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      console.log(answer);
      const { startMenu } = answer;
      console.log(startMenu);
      if (startMenu === "View all departments") {
        viewDepartments();
      }
      if (startMenu === "View all roles") {
        viewRoles();
      }
      if (startMenu === "View all employees") {
        viewEmployees();
      }
      if (startMenu === "Add a department") {
        addDepartment();
      }
      if (startMenu === "Add a role") {
        addRole();
      }
      if (startMenu === "Add an employee") {
        addEmployee();
      }
      if (startMenu === "Update an employee role") {
        updateEmployee();
      }
      if (startMenu === "Exit") {
        db.end();
      }
    });
}
init();
//funtion to view all departments
const viewDepartments = () => {
  db.query("SELECT * FROM department", function (err, employee) {
    if (err) {
      console.log(err);
    }
    console.table(employee);
    init();
  });
};

//function to view all roles
const viewRoles = () => {
  db.query("SELECT * FROM role", function (err, employee) {
    if (err) {
      console.log(err);
    }
    console.table(employee);
    init();
  });
};
//function to view all employees
const viewEmployees = () => {
  db.query("SELECT * FROM employee", function (err, employee) {
    if (err) {
      console.log(err);
    }
    console.table(employee);
    init();
  });
};

//function to add a department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the name of the new department?",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO department (name) VALUES ("${answer.newDepartment}")`,
        function (err, employee) {
          if (err) {
            console.log(err);
          }
          console.log("New department added!");
          init();
        }
      );
    });
};

//function to add a role
//function to add a role
const addRole = () => {
  db.query("SELECT * FROM department", (err, employee) => {
    if (err) {
      console.log(err);
    }
    var departments = employee.map((department) => {
      return {
        name: department.name,
        value: department.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "newRole",
          message: "What is the name of the new role?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the salary of the new role?",
        },
        {
          type: "list",
          name: "departmentID",
          message: "What is the department of the new role?",
          choices: departments,
        },
      ])
      .then((res) => {
        db.query(
          `INSERT INTO role SET ?`,
          {
            title: res.newRole,
            salary: res.salary,
            department_id: res.departmentID,
          },
          (err, employee) => {
            if (err) {
              console.log(err);
            } else {
              console.log("New role added!");
              init();
            }
          }
        );
      });
  });
};
//function to add an employee and assign them a manager
const addEmployee = () => {
  db.query("SELECT * FROM role", (err, employee) => {
    if (err) {
      console.log(err);
    }
    var roles = employee.map((role) => {
      return {
        name: role.title,
        value: role.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "What is the first name of the new employee?",
        },
        {
          type: "input",
          name: "lastName",
          message: "What is the last name of the new employee?",
        },
        {
          type: "list",
          name: "roleID",
          message: "What is the role of the new employee?",
          choices: roles,
        },
      ])
      .then((res) => {
        db.query(
          "SELECT first_name, last_name, id FROM employee",
          (err, managers) => {
            if (err) {
              console.log(err);
            }
            const newEmployeeInfo = res;
            var managers = managers.map((managerID) => {
              return {
                name: managerID.first_name + " " + managerID.last_name,
                value: managerID.id,
              };
            });
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "managerID",
                  message: "Who is the manager of the new employee?",
                  choices: managers,
                },
              ])
              .then((res) => {
                db.query(
                  `INSERT INTO employee SET ?`,
                  {
                    first_name: newEmployeeInfo.firstName,
                    last_name: newEmployeeInfo.lastName,
                    role_id: newEmployeeInfo.roleID,
                    manager_id: res.managerID,
                  },
                  (err, employee) => {
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("New employee added!");
                      init();
                    }
                  }
                );
              });
          }
        );
      });
  });
};
//function to update an employee role
const updateEmployee = () => {
  db.query("SELECT * FROM employee", (err, employee) => {
    if (err) {
      console.log(err);
    }
    var employees = employee.map((employeeID) => {
      return {
        name: employeeID.first_name + " " + employeeID.last_name,
        value: employeeID.id,
      };
    });
    db.query("SELECT * FROM role", (err, employee) => {
      if (err) {
        console.log(err);
      }
      var roles = employee.map((roleID) => {
        return {
          name: roleID.title,
          value: roleID.id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "employeeID",
            message: "Which employee would you like to update?",
            choices: employees,
          },
          {
            type: "list",
            name: "roleID",
            message: "What is the employee's new role?",
            choices: roles,
          },
        ])
        .then((res) => {
          db.query(
            `UPDATE employee SET role_id = ${res.roleID} WHERE id = ${res.employeeID}`,
            (err, employee) => {
              if (err) {
                console.log(err);
              } else {
                console.log("Employee role updated!");
                init();
              }
            }
          );
        });
    });
  });
};
