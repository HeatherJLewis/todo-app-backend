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
//saveTask can now save task to a specific user
 function saveTask(taskDescription, userId) {
    const connection = getDatabaseConnection();

    return new Promise(function(resolve, reject) {
        
        const postData  = {
            taskDescription: taskDescription, 
            taskCompleted: false,
            userId: userId
        };

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
 }

    function updateTask(taskDescription, taskCompleted, taskId) {
        const connection = getDatabaseConnection();

        return new Promise(function(resolve, reject) {
            const sql = 'UPDATE Tasks SET taskDescription = ?, taskCompleted = ? WHERE taskId = ?';
            let data = [taskDescription, taskCompleted, taskId];

        connection.query(sql, data, function (error, results, fields) {
            if (error) {
                connection.destroy();
                    return reject(error);
                }
                else {
                    connection.end();
                      return resolve(results);
                }
            })
        });    
    }

    function deleteTask(taskId) {
        const connection = getDatabaseConnection();

        return new Promise(function(resolve, reject) {
            
        connection.query('DELETE FROM Tasks WHERE taskId = ?', taskId, function (error, results, fields) {
            if (error) {
                connection.destroy();
                 return reject(error);
            }
            else {
                connection.end();
                 return resolve(results);
            }
        })
    });
}
 module.exports = {
     getTasks,
     saveTask,
     updateTask,
     deleteTask
 }

//  SELECT Username, Description
// FROM User
// CROSS JOIN Tasks
// WHERE User.UserId = Tasks.UserId AND Tasks.Completed = 'false';