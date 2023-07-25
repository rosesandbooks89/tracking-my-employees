# Tracking-My-Employees

## Table of Contents
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Struggles and Sources](#struggles-and-sources)
* [Questions](#questions)


## User Story
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

## Acceptance Criteria

* GIVEN a command-line application that accepts user input
* WHEN I start the application
* THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
* WHEN I choose to view all departments
* THEN I am presented with a formatted table showing department names and department ids
* WHEN I choose to view all roles
* THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
* WHEN I choose to view all employees
* THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* WHEN I choose to add a department
* THEN I am prompted to enter the name of the department and that department is added to the database
* WHEN I choose to add a role
* THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
* WHEN I choose to add an employee
* THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
* WHEN I choose to update an employee role
* THEN I am prompted to select an employee to update and their new role and this information is updated in the database

## Installation
To install necessary dependencies, run the following command:
```
npm i
npm i mysql2
```
Make sure to run mysql -u root -p to gain access to MYSQL before continuing
npm start
Run through prompts as required

## Usage
This application is used for tracking employees, roles, and departments.
To run the application, run the following command:
```
node index.js
```

## License
This project has no license at this time.

## Struggles and Sources
I had a few issues with this assignment. I was able to piece together the code using my tutor and asking askBCS and my classmates but mostly I referred back to the weeks assignments and the class activities. I also used the following sites for help:
* [Inquirer](https://www.npmjs.com/package/inquirer)
* [MySQL](https://www.npmjs.com/package/mysql)

The first problem I ran into was getting my index file to run in the console. When running node index.js got errors. Working with my tutor I found minor typos and errors within my seeds schema and seeds file. 
The next problem I ran into was that i was getting errors when sourcing my seed file, I was able to fix this by seeing that I had assigned the wrong department id to my employees because I only had 4 departments but I had assigned numbers 5 and above.

## Questions
If you have any questions, please contact me at the email below. Check out my Github portfolio for more of my projects!

Here is a link to my [GitHub Repo](https://github.com/rosesandbooks89).

If you have any questions please email me at: rosesandbooks89@gmail.com.


