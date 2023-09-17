-- USE EMPLOYEEDB --
USE employeeDB;

-- INSERT DEPARTMENT NAMES INTO DEPARTMENT TABLE --
-- ID FOR DEPARTMENTS, AUTO GENERATED, STARTS FROM 1 ... 2 ... 3 ... AND SO ON.
INSERT INTO department (name) VALUES
('Sales'),                              -- SALES --
('Engineering'),                        -- ENGINEERING --
('HR'),                                 -- HR --
('Legal'),                              -- LEGAL --
('FINANCE');                            -- FINANCE --

-- INSERT ROLE: TITLES, SALARIES, AND DEPARTMENT IDS INTO ROLE TABLE --
-- ID FOR ROLES: AUTO GENERATED --
INSERT INTO role (title, salary, department_id) VALUES
('Sales Lead', 100000, 1),                      -- SALES LEAD ROLE:     SALES DEPARTMENT 1 
('Sales Person', 80000, 1),                     -- SALES PERSON ROLE:   SALES DEPARTMENT 1
('Engineer', 150000, 2),                        -- ENGINEER ROLE:       ENGINEERING DEPARTMENT 2
('HR', 55000, 3),                               -- HR ROLE:             HR DEPARTMENT 3
('Lawyer', 19000, 4),                           -- LAWYER ROLE:         LEGAL DEPARTMENT 4
('Legal Team Lead', 250000, 4),                 -- LEGAL TEAM:          LEGAL DEPARTMENT 4
('Accountant', 125000, 5),                      -- ACCOUNTANT ROLE:     ACCOUNTING DEPARTMENT 5
('Account Manager', 160000, 5);                 -- ACCT MANAGER ROLE:   ACCOUNTING DEPARTMENT 5



-- INSERT EMPLOYEE NAMES, ROLES, AND MANAGERS INTO EMPLOYEE TABLE --
-- MANAGER ID IS ID OF ANOTHER EMPLOYEE --
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 1, 1),
('Ashley', 'Rodriguez', 2, NULL),
('Kevin', 'Tupik', 2, 2);
