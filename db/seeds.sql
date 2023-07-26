USE employee_db;

-- departments table
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Management');

-- roles table
INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4),
('Manager', 200000, 5);

-- employees table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Ashley', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 1),
('Malia', 'Brown', 2, NULL),
('Sarah', 'Lourd', 5, 2),
('Derek', 'Jeeter', 5, NULL);




