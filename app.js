var express = require('express') ;
var todoController = require('./controllers/todoController')

var app = express() ;

//Set up template engine
app.set('view engine', 'ejs') ;

//static files
app.use(express.static('./public')) 

// fire controller
todoController(app);

const PORT = 3000;
app.listen(PORT)

console.log(`Listening to port ${PORT}`)