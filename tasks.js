const serverless = require('serverless-http');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const databaseService = require('./databaseservice');

app.get('/tasks', function (request, response) {
  databaseService.getTasks()
    .then(function (tasks) {
    //we got the tasks ok
      response.json(tasks);
    })
    .catch(function (error) {
    //something went wrong when getting the tasks
      response.status(500);
      response.json(error);
    })
  });

  app.get('/tasks/taskstodo', function (request, response) {
    databaseService.getTasksToDo()
      .then(function (tasksToDo) {
        //we got the tasks ok
        response.json(tasksToDo);
      })
      .catch(function (error) {
        //something went wrong when getting the tasks
        response.status(500);
        response.json(error);
     })
    });  

app.post('/tasks', function (request, response) {

  const taskDescription = request.body.taskDescription;
  // const userId = request.body.userId;

  databaseService.saveTask(taskDescription)
    .then(function (results) {
      response.json(results);
    })
    .catch(function (error) {
      response.status(500);
      response.json(error);
    });
})

app.put('/tasks/:taskId', function (request, response) {

  // const taskDescription = request.body.taskDescription;
  // const taskCompleted = request.body.taskCompleted;
  const taskId = request.params.taskId;

  databaseService.updateTask(taskId)
    .then(function (results) {
      response.json(results);
    })
    .catch(function (error) {
      response.status(500);
      response.json(error);
    });
})

app.delete('/tasks/:taskId', function (request, response) {

  const taskId = request.params.taskId;

  databaseService.deleteTask(taskId)
    .then(function (results) {
      response.json(results);
    })
    .catch(function (error) {
      response.status(500);
      response.json(error);
    });
})

module.exports.handler = serverless(app);