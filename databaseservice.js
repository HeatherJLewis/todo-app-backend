//reads tasks, inserts new tasks etc
const mysql = require("mysql");

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
 }

 function getTasks() {
    const connection = getDatabaseConnection();
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM Tasks", function(error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });
    });
 }

 function saveTask(taskDescription) {
    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {
        
        const postData  = {
            taskDescription: taskDescription, 
            taskCompleted: false,
            userId: 1};

        connection.query('INSERT INTO Tasks SET ?', postData, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
    });
 });

 module.exports = {
     getTasks,
     saveTask
 }

//  SELECT Username, Description
// FROM User
// CROSS JOIN Tasks
// WHERE User.UserId = Tasks.UserId AND Tasks.Completed = 'false';