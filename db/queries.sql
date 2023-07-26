SELECT department_id, SUM(salary) AS sum_salary
FROM role
GROUP BY department_id;

SELECT department_id, COUNT(*) AS count_employees
FROM role
GROUP BY department_id;

SELECT department_id, COUNT(*) AS count_roles
FROM role
GROUP BY department_id; */



