// IMPORT MYSQL2/PROMISE LIBRARY
const mysql = require('mysql2/promise');

// EMPLOYEE DATABASE CLASS
class EmployeeDB {
  constructor(config) {  // CONSTRUCTOR METHOD
    this.config = config;  // STORE DATABASE CONFIG
    this.connection = null;  // INITIALIZE DATABASE CONNECTION
  }

  // CONNECT TO DATABASE METHOD
  async connect() {  
    try {
      this.connection = await mysql.createConnection(this.config);
      console.log('Connected to the database!');  
    } catch (error) {
      throw error;  // THROW ERROR IF CONNECTION FAILS
    }
  }

  async close() {  // METHOD TO CLOSE DATABASE CONNECTION
    if (this.connection) {
      await this.connection.end();
      console.log('Connection to the database closed.');  // CONNECTION CLOSING MESSAGE
    }
  }

  async viewAllDepartments() {  // METHOD TO VIEW ALL DEPARTMENTS
    try {
      const [rows] = await this.connection.query('SELECT * FROM department');
      return rows;  // RETURN DEPARTMENT DATA
    } catch (error) {
      throw error;  // THROW ERROR IF RETRIEVAL FAILS
    }
  }

  async viewAllRoles() {  // METHOD TO VIEW ALL ROLES
    try {
      const [rows] = await this.connection.query(`
        SELECT role.id, role.title, role.salary, department.name AS department
        FROM role
        JOIN department ON role.department_id = department.id
      `);
      return rows;  // RETURN ROLE DATA
    } catch (error) {
      throw error;  // THROW ERROR IF RETRIEVAL FAILS
    }
  }

  async viewAllEmployees() {  // METHOD TO VIEW ALL EMPLOYEES
    try {
      const [rows] = await this.connection.query(`
        SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id;
      `);
      return rows;  // RETURN EMPLOYEE DATA
    } catch (error) {
      throw error;  // THROW ERROR IF RETRIEVAL FAILS
    }
  }

  async addDepartment(departmentName) {  // METHOD TO ADD DEPARTMENT
    try {
      const [result] = await this.connection.query('INSERT INTO department (name) VALUES (?)', [departmentName]);
      return result;  // RETURN RESULT OF ADDITION
    } catch (error) {
      throw error;  // THROW ERROR IF ADDITION FAILS
    }
  }

  async addRole(title, salary, departmentName) {  // METHOD TO ADD ROLE
    try {
      const [departments] = await this.connection.query('SELECT id FROM department WHERE name = ?', [departmentName]);

      if (departments.length === 0) {
        throw new Error(`Department '${departmentName}' not found.`);
      }

      const departmentId = departments[0].id;
      const [result] = await this.connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [
        title,
        salary,
        departmentId,
      ]);

      return result;  // RETURN RESULT OF ADDITION
    } catch (error) {
      throw error;  // THROW ERROR IF ADDITION FAILS
    }
  }

  async addEmployee(firstName, lastName, roleId, managerId = null) {  // METHOD TO ADD EMPLOYEE
    try {
      const [result] = await this.connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [firstName, lastName, roleId, managerId]
      );

      return result;  // RETURN RESULT OF ADDITION
    } catch (error) {
      throw error;  // THROW ERROR IF ADDITION FAILS
    }
  }

  async updateEmployeeRole(employeeId, roleId) {  // METHOD TO UPDATE EMPLOYEE ROLE
    try {
      const [result] = await this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId]);
      return result;  // RETURN RESULT OF UPDATE
    } catch (error) {
      throw error;  // THROW ERROR IF UPDATE FAILS
    }
  }
}

module.exports = EmployeeDB;  // EXPORT EMPLOYEE DATABASE CLASS
