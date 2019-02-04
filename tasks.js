const serverless = require('serverless-http');
const express = require('express');
// const bodyParser = require('body-parser');
const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded())

app.get('/tasks', function (request, response) {

 const username = request.query.username;
//  const tasks = request.query.tasks;
//Takes in 2 parameters to print "Heather You need to feed the animals" where tasks is the name of the task list to be accessed ie 'feed_the_animals'
//https://278nggy6rg.execute-api.eu-west-2.amazonaws.com/dev/tasks?tasks=feed_the_animals&username=Heather


 const taskList = {
  message: username + " You have stuff to do!", 
  tasksToDoList: [{
    id: 1,
    description: 'Feed Llama',
    completed: false
  },
  {  id: 2,
    description: 'Feed Tiger',
    completed: false
  },
  {
    id: 3,
    description: 'Feed Chinchilla',
    completed: false
  }]
 };

 response.json(taskList);
});

app.post('/tasks', function(request, response) {

  const toDo = request.body.toDo;

 const someJson = {
   message: 'You Created a Task' + toDo,
 };
 response.json(someJson);
});

module.exports.handler = serverless(app);