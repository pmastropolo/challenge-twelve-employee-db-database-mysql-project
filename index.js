// REQUIRED MODULES
const inquirer = require('inquirer'); // PROMPTS
const chalk = require('chalk'); 
const Table = require('cli-table3'); // CREATING TABLES
const EmployeeDB = require('./utils/employeedb.js'); // CUSTOM DB CLASS
require('dotenv').config(); 



// INITIALIZING THE DATABASE CONNECTION
async function initializeApp() {
  try {
    const db = new EmployeeDB({                 // CREATE NEW DB INSTANCE
      host: process.env.DB_HOST,                // DATABASE HOST
      user: process.env.DB_USER,                // DATABASE USER
      password: process.env.DB_PASSWORD,        // DATABASE PASSWORD
      database: 'employeeDB',                   // DATABASE NAME
    });

    await db.connect(); // CONNECT TO DATABASE
    await mainMenu(db); // START MAIN MENU
    await db.close(); // CLOSE DATABASE CONNECTION
  } catch (error) {
    console.error(chalk.red('Error:', error));    // ERROR MESSAGE RED
  }
}

// MAIN MENU USER INTERACTIONS
async function mainMenu(db) {   // ASYNC HANDLE USER INTERACTIONS
  while (true) {
    const { action } = await inquirer.prompt({
      name: 'action',
      type: 'list',
      message: 'What would you like to do?',   // DISPLAY PROMPT
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Exit',
      ],
    });


    // USERS CHOICES
  
    switch (action) {
      case 'View all departments':
        await displayAllDepartments(db);
        break;

      case 'View all roles':
        await displayAllRoles(db);
        break;

      case 'View all employees':
        await displayAllEmployees(db);
        break;

      case 'Add a department':
        await addDepartment(db);
        break;

      case 'Add a role':
        await addRole(db);
        break;

      case 'Add an employee':
        await addEmployee(db);
        break;

      case 'Update an employee role':
        await updateEmployeeRole(db);
        break;

      case 'Exit':
        return;
    }
  }
}

// DISPLAY ALL DEPARTMENTS
async function displayAllDepartments(db) {
  const departments = await db.viewAllDepartments();    // RETRIEVE ALL DEPARTMENTS FROM DATABASE
  const table = new Table({                             // CREATE TABLE DISPLAY
    head: [chalk.blue('ID'), chalk.magenta('Department Name')],
    style: { head: ['yellow'], border: ['white'] },   // TABLE STYLE
  });

  departments.forEach((dept) => {               // LOOP THROUGH DEPARTMENTS AND ADD TO THE TABLE
    table.push([chalk.blue(dept.id), chalk.magenta(dept.name)]);
  });

  console.log(table.toString()); // DISPLAY TABLE
}



// DISPLAY ALL ROLES
async function displayAllRoles(db) {    // ASYNC
  const roles = await db.viewAllRoles();    // RETRIEVE ALL ROLES FROM DATABASE
  const table = new Table({     // CREATE TABLE DISPLAY
    head: [                     // DEFINE TABLE HEADERS
      chalk.blue('ID'),                  // DISPLAY 'ID' HEADER IN BLUE 
      chalk.magenta('Title'),             // DISPLAY 'Title' HEADER IN MAGENTA
      chalk.cyan('Department'),           // DISPLAY 'Department' HEADER IN CYAN
      chalk.green('Salary'),              // DISPLAY 'Salary' HEADER IN GREEN
    ],
    style: { head: ['green'], border: ['white'] },    // TABLE STYLE
  });

  roles.forEach((role) => {                     // LOOP THROUGH ROLES/ADD TO TABLE
    table.push([                                // ADD ROLE INFO TO TABLE ROW
      chalk.blue(role.id),                      // DISPLAY ROLE ID IN BLUE
      chalk.magenta(role.title),                // DISPLAY ROLE TITLE IN MAGENTA
      chalk.cyan(role.department),              // DISPLAY ROLE DEPARTMENT IN CYAN
      chalk.green(role.salary),                 // DISPLAY ROLE SALARY IN GREEN
    ]);
  });

  console.log(table.toString());    // DISPLAY TABLE
}



// DISPLAY ALL EMPLOYEES
async function displayAllEmployees(db) { 
  const employees = await db.viewAllEmployees(); // RETRIEVE ALL EMPLOYEES FROM DATABASE

  const table = new Table({                 // CREATE TABLE DISPLAY EMPLOYEE DATA
    head: [                                 // DEFINE TABLE HEADERS
      chalk.blue('ID'),                      // DISPLAY 'ID' HEADER IN BLUE
      chalk.magenta('First Name'),            // DISPLAY 'First Name' HEADER IN MAGENTA
      chalk.cyan('Last Name'),                // DISPLAY 'Last Name' HEADER IN CYAN
      chalk.green('Title'),                     // DISPLAY 'Title' HEADER IN GREEN
      chalk.yellow('Department'),                   // DISPLAY 'Department' HEADER IN YELLOW
      chalk.red('Salary'),                          // DISPLAY 'Salary' HEADER IN RED
      chalk.white('Manager'),                     // DISPLAY 'Manager' HEADER WHITE
    ],
    style: { head: ['green'], border: ['white'] }, // TABLE HEAD STYLE
  });

  employees.forEach((employee) => {                 // LOOP THROUGH EMPLOYEES/ADD THEIR DATA TO TABLE
    table.push([
      chalk.blue(employee.id),                      // DISPLAY EMPLOYEE ID IN BLUE
      chalk.magenta(employee.first_name),               // DISPLAY FIRST NAME IN MAGENTA
      chalk.cyan(employee.last_name),                 // DISPLAY LAST NAME IN CYAN
      chalk.green(employee.title),                      // DISPLAY TITLE IN GREEN
      chalk.yellow(employee.department),                  // DISPLAY DEPARTMENT IN YELLOW
      chalk.red(employee.salary),                             // DISPLAY SALARY IN RED
      employee.manager ? chalk.white(employee.manager) : 'N/A', // DISPLAY MANAGER IN WHITE IF AVAILABLE, OTHERWISE 'N/A'
    ]);
  });

  console.log(table.toString()); // DISPLAY TABLE
}



// ADD A DEPARTMENT
async function addDepartment(db) { // ASYNCHRONOUSLY ADD A DEPARTMENT
  const { name } = await inquirer.prompt({ // AWAIT USER INPUT FOR DEPARTMENT NAME
    name: 'name',
    type: 'input',
    message: 'Enter the department name:', // DEPARTMENT NAME
  });

  try {
    await db.addDepartment(name); // ATTEMPT ADD DEPARTMENT TO DATABASE
    console.log(chalk.yellow('Department added successfully!')); // SUCCESS MESSAGE YELLOW
  } catch (error) {
    console.error(chalk.red('Error adding department:', error.message)); // ERROR MESSAGE RED
  }
}



// ADD A ROLE
async function addRole(db) { // ASYNCHRONOUSLY ADD A ROLE
  const answers = await inquirer.prompt([ // AWAIT USER INPUT FOR ROLE DETAILS
    {
      name: 'title',
      type: 'input',
      message: 'Enter the role title:', // ROLE TITLE
    },
    {
      name: 'salary',
      type: 'input',
      message: 'Enter the role salary:', // ROLE SALARY
    },
    {
      name: 'department',
      type: 'input',
      message: 'Enter the department for this role:', // DEPARTMENT
    },
  ]);

  try {
    await db.addRole(answers.title, answers.salary, answers.department); // ATTEMPT TO ADD ROLE TO DATABASE
    console.log(chalk.green('Role added successfully!')); // SUCCESS MESSAGE GREEN
  } catch (error) {
    console.error(chalk.red('Error adding role:', error.message)); // ERROR MESSAGE RED 
  }
}



// ADD AN EMPLOYEE
async function addEmployee(db) { // ASYNC ADD AN EMPLOYEE

  const answers = await inquirer.prompt([ // AWAIT USER INPUT FOR EMPLOYEE DETAILS
    {
      name: 'firstName',
      type: 'input',
      message: "Enter the employee's first name:", // FIRST NAME
    },
    {
      name: 'lastName',
      type: 'input',
      message: "Enter the employee's last name:", // LAST NAME
    },
    {
      name: 'roleId',
      type: 'number',
      message: 'Enter the role ID for the employee:', // ROLE ID
    },
    {
      name: 'managerId',
      type: 'number',
      message: 'Enter the manager\'s ID for the employee (or leave empty if none):', // MANAGER ID
    },
  ]);

  try {
    await db.addEmployee( // ATTEMPT TO ADD EMPLOYEE TO DATABASE
      answers.firstName,
      answers.lastName,
      answers.roleId,
      answers.managerId || null
    );
    console.log(chalk.green('Employee added successfully!')); // GREEEN SUCESS MESSAGE
  } catch (error) {
    console.error(chalk.red('Error adding employee:', error.message)); // ERROR MESSAGE RED 
  }
}


// UPDATE EMPLOYEE'S ROLE
async function updateEmployeeRole(db) { // ASYNCHRONOUSLY UPDATE EMPLOYEE'S ROLE
  const answers = await inquirer.prompt([
    {
      name: 'employeeId',
      type: 'number',
      message: 'Enter the employee ID you want to update:', // PROMPT EMPLOYEE ID
    },
    {
      name: 'newRoleId',
      type: 'number',
      message: 'Enter the new role ID for the employee:', // PROMPT NEW ROLE ID
    },
  ]);

  try {
    await db.updateEmployeeRole(answers.employeeId, answers.newRoleId); // ATTEMPT UPDATE EMPLOYEE'S ROLE IN DATABASE
    console.log(chalk.green('Employee role updated successfully!')); // GREEN SUCCESS MESSAGE
  } catch (error) {
    console.error(chalk.red('Error updating employee role:', error.message)); // ERROR MESSAGE RED 
  }
}


// START APPLICATION
initializeApp();