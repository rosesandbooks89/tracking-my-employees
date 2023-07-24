USE employee_db;

-- departments table
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

-- roles table
INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

-- employees table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 1),
('Malia', 'Brown', 5, NULL),
('Sarah', 'Lourd', 6, 2),
('Tom', 'Allen', 7, 1),
('Samantha', 'Jones', 8, 1);


