const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        database: 'employee_db',
        password: 'rose89'
    },
    console.log('Connected to the employee_db database.')
);
//function to the start menu
function init() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Select a menu option',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit'
            ]
            .then((answer) => {
                if (answer.mainMenu === 'View All Departments') {
                    viewDepartments();
                }
                if (answer.mainMenu === 'View All Roles') {
                    viewRoles();
                }
                if (answer.mainMenu === 'View All Employees') {
                    viewEmployees();
                }
                if (answer.mainMenu === 'Add a Department') {
                    addDepartment();
                }
                if (answer.mainMenu === 'Add a Role') {
                    addRole();
                }
                if (answer.mainMenu === 'Add an Employee') {
                    addEmployee();
                }
                if (answer.mainMenu === 'Update an Employee Role') {
                    updateEmployee();
                }
                if (answer.mainMenu === 'Exit') {
                    console.log('You have exited. To restart, type "node index.js"')
                    db.end();
                }
            })
            .catch((error) => {
                console.log(error);
            })
        }
    ])
}
init();

//funtion to view all departments
const viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, employee) {
        if (err) {
            console.log(err);
        }
        console.table(employee);
        init();
    })
}

//function to view all roles
const viewRoles = () => {
    db.query('SELECT * FROM role', function (err, employee) {
        if (err) {
            console.log(err);
        }
        console.table(employee);
        init();
    })
}
//function to view all employees
const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, employee) {
        if (err) {
            console.log(err);
        }   
        console.table(employee);
        init();
    })
}

//function to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'newDepartment',
            message: 'What is the name of the new department?'
        }
    ])
        .then((answer) => {
            db.query(`INSERT INTO department (name) VALUES ("${answer.newDepartment}")`, function (err, employee) {
                if (err) {
                    console.log(err);
                }
                console.log('New department added!');
                init();
            })
        })
}

//function to add a role
const addRole = () => {
    db.query('SELECT * FROM department', function (err, employee) {
        if (err) {
            console.log(err);
        }
        var depts = depts.map((dept) => {
            return {
                name: dept.name,
                value: dept.id
                }
                })
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'What is the title of the new role?'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the new role?'
                    },
                    {
                        type: 'list',
                        name: 'department',
                        message: 'What department does the new role belong to?',
                        choices: depts
                    }
                ])
                    .then((answer) => {
                        db.query(`INSERT INTO role SET ?`, {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: answer.department
                            }, (err, employee) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                console.log('New role added!');
                            //callback to go back to the main menu
                            init();
                        }
                    })
                })
            })
}
//function to add an employee and assign them a manager
const addEmployee = () => {
    db.query('SELECT * FROM role', (err, employee) => {
        if (err) {
            console.log(err);
        }
        var roles = employee.map((role) => {
            return {
                name: role.title,
                value: role.id
            };
        })
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the first name of the new employee?'
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the last name of the new employee?'
                },
                {
                    type: 'list',
                    name: 'roleID',
                    message: 'What is the role of the new employee?',
                    choices: roles
                },
            ])
                .then(res => {
                    db.query('SELECT first_name, last_name, id FROM employee', (err, employee) => {
                        if (err) {
                            console.log(err);
                        }
                      const newEmployeeInfo = res
                      var managers = managers.map((managerID) => {
                            return {
                                name: managerID.first_name + ' ' + managerID.last_name,
                                value: managerID.id
                            }
                        })
                        inquirer.prompt([
                            {
                                type: 'list',
                                name: 'managerID',
                                message: 'Who is the manager of the new employee?',
                                choices: managers
                            }
                        ])
                            .then((res) => {
                                db.query(`INSERT INTO employee SET ?`, {
                                    first_name: newEmployeeInfo.firstName,
                                    last_name: newEmployeeInfo.lastName,
                                    role_id: newEmployeeInfo.roleID,
                                    manager_id: res.managerID,
                                }, (err, employee) => {
                                    if (err) {
                                        console.log(err);
                                    }
                                    else {
                                        console.log('New employee added!');
                                        init();
                                    }
                                })
                            })
                    })
                })
        })
}
//function to update an employee role
const updateEmployeeRole = () => {
    db.query('SELECT * FROM employee', (err, employee) => {
        if (err) {
            console.log(err);
        }
        var employeesInfo = employee.map((employee) => {
            return {
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id
            }
        })
        inquirer.prompt([
            {
                type: 'list',
                name: 'employeeName',
                message: 'Which employee would you like to update?',
                choices: employeesInfo
            }
        ])
            .then((res) => {
                db.query('SELECT * FROM role', (err, empRoles) => {
                    const employeeID = res.employeeName;
                    console.log(employeeID);
                    if (err) {
                        console.log(err);
                    }
                    var roles = empRoles.map((role) => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    }
                    )
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'newRole',
                            message: 'What is the new role of the employee?',
                            choices: roles
                        }
                    ])
                        .then((res) => {
                            db.query(`UPDATE employee SET role_id = ${res.newRole} WHERE id = ${employeeID}`, (err, employee) => {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log('Employee role updated!');
                                    init();
                                }
                            })
                        }
                        )
                })
            })
    })
}


