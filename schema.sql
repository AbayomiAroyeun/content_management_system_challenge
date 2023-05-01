DROP DATABASE IF EXISTS resources_db;
CREATE DATABASE resources_db;

USE resources_db;

CREATE TABLE departments(
department_id INT AUTO_INCREMENT PRIMARY KEY,
department_name VARCHAR(30)
);


CREATE TABLE roles(
roles_id INT AUTO_INCREMENT PRIMARY KEY,
roles_role VARCHAR(30),
salary DECIMAL,
department_id INT,
FOREIGN KEY(department_id) REFERENCES departments(department_id)
);

CREATE TABLE employees(
employees_id INT AUTO_INCREMENT PRIMARY KEY,
first_name  VARCHAR(30),
last_name  VARCHAR(30),
role_id INT,
FOREIGN KEY(role_id) REFERENCES roles(roles_id),
manager_id INT,
FOREIGN KEY (manager_id) REFERENCES employees(employees_id) 
);