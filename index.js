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
const questions =  function(){


inquirer
    .prompt([
        {
            type: 'list',
            name: 'option',
            message: 'what would you like to do?',
            choices: [
                'view all departments',
                'view all roles',
                'view all employees',
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
            case 'view all departments':
                // retrieve all departments from database
                connection.query('SELECT * FROM departments', (err, results) => {
                    if (err) throw err;
                    console.table(results);
                    questions();
                    //promt for another option
                });
                break;
            case 'view all roles':
                //query to retrieve all roles from the database
                connection.query('SELECT * FROM roles', (err, results) => {
                    if (err) throw err;
                    console.table(results);
                    questions();
                    //prompt for another option

                });
            case 'view all employees':
                //query to retrieve all employees from the database
                connection.query('SELECT * FROM employees', (err, results) => {
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
                            'INSERT INTO departments SET ?',
                            { department_name: answer.department_name },
                            (err, _results) => {
                                if (err) throw err;
                                console.log('Department added successfully!');
                                  questions();
                            }
                        );
                    });
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

