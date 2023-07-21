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
//function to view all departments
const viewDepartments = () => {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        init();
    })
}
//function to view all roles
const viewRoles = () => {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        init();
    })
}
//function to view all employees
const viewEmployees = () => {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        init();
    })
}
//function to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department you would like to add.'
        }
    ])
        .then(res => {
            db.query('INSERT INTO department (name) VALUES (?)', res.departmentName, function (err, results) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Department added successfully!');
                }
                //back to main menu
                init();
            })
        })
}
//function to add a role
const addRole = () => {
    db.query('SELECT * FROM department', function (err, results) {
        if (err) console.log(err);
        var departmentChoices = results.map(department => {
            return {
                name: department.name,
                value: department.id
            }
        }
        )
        inquirer.prompt([
            {
                type: 'input',
                name: 'roleName',
                message: 'Enter the name of the role you would like to add.'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary of the role you would like to add.'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department of the role you would like to add.',
                choices: departmentChoices
            }
        ])
            .then(res => {
                db.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [res.roleName, res.salary, res.departmentId], function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log('Role added successfully!');
                    }
                    //back to main menu
                    init();
                })
            }
            )
    })
}
//function to add an employee
const addEmployee = () => {
    //funtion to get role id
    db.query('SELECT * FROM role', function (err, results) {
        if (err) console.log(err);
        var roleChoices = results.map(role => {
            return {
                name: role.title,
                value: role.id,
            }
        })
        inquirer.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the employee you would like to add.'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the employee you would like to add.'
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the role of the employee you would like to add.',
                choices: roleChoices
            }
        ])
        .then(res => {
            db.query('Select firstName, lastName, roleId FROM employee WHERE manager_id IS NULL', (err, results) => {
                if (err) console.log(err);
                const newEmployee = res;
                var managers = results.map((managersID) => {
                    return {
                        name: managersID.firstName + ' ' + managersID.lastName,
                        value: managersID.roleId
                    }

                }
                )
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'managerId',
                        message: 'Select the manager of the employee you would like to add.',
                        choices: managers
                    }
                ])
                .then(res => {
                    db.query('INSERT INTO employee SET ?',{
                        firstName: newEmployee.firstName,
                        lastName: newEmployee.lastName,
                        roleId: newEmployee.roleId,
                        managerId: newEmployee.managerId
                    }, 
                    (err, results) => {
                        if (err) console.log(err);
                        console.log('Employee added successfully!');
                        init();
                    }
                    )
                })
            })
        })
    })
}
//function to update an employee