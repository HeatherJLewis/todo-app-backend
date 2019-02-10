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
  databaseService.saveTask(taskDescription)
  .then(function(results) {
    response.json(results);
})
  .catch(function(error) {
    response.status(500);
    response.json(error);
  });
})

app.put('/tasks/:taskId', function(request, response) {

  const toChange = request.params.taskId;

 const someJson = {
   message: 'You Updated Task ' + toChange
 };
 response.json(someJson);
});

app.delete('/tasks/:taskId', function(request, response) {

  const toDelete = request.params.taskId;

 let someResponse = {
   message: 'You Deleted Task Number ' + toDelete
 };

 if (toDelete > 3) {
   response.status(404);
   someResponse = {
     message: 'There is no task number ' + toDelete
   };
 }

 response.json(someResponse);
});

module.exports.handler = serverless(app);