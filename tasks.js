const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function (request, response) {

 const username = request.query.username;
 const tasks = request.query.tasks;
//Takes in 2 parameters to print "Heather You need to feed the animals" where tasks is the name of the task list to be accessed ie 'feed_the_animals'

 const someJson = {
  message: username + " You need to " + tasks, 
  taskList: [{
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
},
]
 };
 response.json(someJson);
})

module.exports.handler = serverless(app);