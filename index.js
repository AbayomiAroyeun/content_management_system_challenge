const inquirer = require("inquirer");
const mysql = require("mysql2");



// Define connections to MYSQL
const connection = mysql.createConnection({
    host: 'localhost',
    // port: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'resources_db'


});


// Prompt the user to choose from options
const questions = function () {


    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'what would you like to do?',
                choices: [
                    'view all department',
                    'view all role',
                    'view all employee',
                    'Add a department',
                    'Add a role',
                    'Add an employee',
                    'update an employee role',
                    'Exit',
                ],

            },
        ])
        .then((answer) => {
            // perform appropriate action based on user's choice
            switch (answer.option) {
                case 'view all department':
                    // retrieve all departments from database
                    connection.query('SELECT * FROM department', (err, results) => {
                        if (err) throw err;
                        console.table(results);
                        questions();
                        //promt for another option
                    });
                    break;
                case 'view all role':
                    //query to retrieve all roles from the database
                    connection.query('SELECT * FROM role', (err, results) => {
                        if (err) throw err;
                        console.table(results);
                        questions();
                        //prompt for another option

                    });
                    break;
                case 'view all employee':
                    //query to retrieve all employees from the database
                    connection.query('SELECT * FROM employee', (err, results) => {
                        if (err) throw err;
                        console.table(results);
                        questions();
                        //prompt for another option
                    });
                    break;
                case 'Add a department':
                    //prompt for new department
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'department_name',
                                message: 'Enter the name of the new department:',
                            },

                        ])
                        .then((answer) => {
                            // perform querry to add new department to database
                            connection.query(
                                'INSERT INTO department SET ?',
                                { name: answer.department_name },
                              
                                (err, _results) => {
                                    if (err) throw err;
                                    console.log('Department added successfully!');
                                    questions();
                                }
                            );
                        });
                    break;
                case 'Add a role':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'role',
                                message: 'Enter the name of the new role:',
                        },
                        ])
                        .then((answer) => {
                    connection.query(
                        'INSERT INTO role SET ?',
                        {role: answer.role },
                        (err, _results) => {
                            if (err) throw err;
                            console.log('role added successfully!');
                            questions();
                        }
                    );
                        });
                    break;
                    

                case 'Add an employee':
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'first_name',
                                message: 'Enter the first_name of the new employee:',
                                
                            },
                            {
                                type: 'input',
                                name: 'last_name',
                                message: 'Enter the last_name of the new employee:',
                            }
                        ])
                        .then((answer) => {
                    connection.query(
                        'INSERT INTO  employee SET ?',
                        {first_name: answer.first_name,
                            last_name: answer.last_name
                        },
                        (err, _results) => {
                            if (err) throw err;
                            console.log('employee added successfully!');
                            questions();
                        }
                    )
                    });
                    break;

                    case 'update an employee role':
                        const updateEmployeeRole = () => {
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'employee_id',
                                message: 'Enter the ID of the employee you want to update:',
                                
                            },
                            {
                                type: 'input',
                                name: 'role_id',
                                message: 'Enter the ID of the new role:',
                            }
                        ])
                        .then((answers) => {
                    connection.query(
                        'UPDATE employee SET role_id = ? WHERE id = ?',
                        [answers.role_id, answers.employee_id],
                        (err, _results) => {
                            if (err) throw err;
                            console.log('employee updated successfully!');
                            questions();
                        }
                    );
                     });
                        };
updateEmployeeRole();
break;
                case 'Exit':
                    // End MSQL connection and exit application
                    connection.end();
                    process.exit();
                default:
                    console.log(`Invalid option: ${answer.option}`);
                    break;
            }
            // questions();

        });

};


questions();

