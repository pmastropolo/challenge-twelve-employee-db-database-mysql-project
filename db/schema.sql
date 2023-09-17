-- Drops the employeeDB if it exists currently --
DROP DATABASE IF EXISTS employeeDB;
-- Creates the "employeeDB" database --
CREATE DATABASE employeeDB;

-- Use employeeDB --
Use employeeDB;

-- Creates the table "DEPARTMENT" within employeeDB --
CREATE TABLE department (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(30) NOT NULL
);

-- Creates the table "ROLE" within employeeDB --
CREATE TABLE role (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(30) NOT NULL, 
        salary DECIMAL NOT NULL,
        department_id INT NOT NULL,
        FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Creates the table "EMPLOYEE" within employeeDB --
CREATE TABLE employee (
        id INT PRIMARY KEY AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES role(id),
        FOREIGN KEY (manager_id) REFERENCES employee(id)
);









