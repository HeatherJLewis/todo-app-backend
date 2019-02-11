const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());

const databaseService = require('./databaseservice');

app.get('/tasks', function (request, response) {

  databaseService.getTasks()
    .then(function(tasks) {
//we got the tasks ok
      response.json(tasks);
  })
    .catch(function(error) {
//something went wrong when getting the tasks
      response.status(500);
      response.json(error);
    });
 })


app.post('/tasks', function(request, response) {

  const taskDescription = request.body.taskDescription;
  const userId = request.body.userId;

  databaseService.saveTask(taskDescription, userId)
  .then(function(results) {
    response.json(results);
})
  .catch(function(error) {
    response.status(500);
    response.json(error);
  });
})

app.put('/tasks/:taskId', function(request, response) {
  
  const taskDescription = request.body.taskDescription;
  // const taskCompleted = request.body.taskCompleted;
  const taskId = request.body.taskId;  

  databaseService.updateTask(taskDescription, taskId)
    .then(function(results) {
      response.json(results);
    })
    .catch(function(error) {
      response.status(500);
      response.json(error);
    });
  })

app.delete('/tasks/:taskId', function(request, response) {

    const taskId = request.body.taskId;

    databaseService.deleteTask(taskId)
    .then(function(results) {
      response.json(results);
    })
    .catch(function(error) {
      response.status(500);
      response.json(error);
    });
  })

module.exports.handler = serverless(app);