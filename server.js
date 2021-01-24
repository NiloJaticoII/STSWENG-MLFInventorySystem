'use strict';
var http = require('http');
var port = process.env.PORT ||  5000;
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
const path = require('path');
const db = require('./models/database.js');
const mongoose = require('mongoose');
const cors = require('cors')


/*
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
*/

//connecting to database
try {
  db.connect();
  } catch (e) {console.log(e);}

//Static file declaration
app.use(express.static(path.join(__dirname, 'frontend/build')));

//production mode
if(process.env.NODE_ENV === 'production') {  
  app.use(express.static(path.join(__dirname, 'frontend/build')));  
  app.get('*', (req, res) => {   
     res.sendfile(path.join(__dirname = 'frontend/build/index.html'));  
  })
}

//build mode
app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/frontend/public/index.html'));})

//app.use(express.static(__dirname + '/public'));

// session
const session = require('express-session');

app.use(session({
  'secret': 'a',
  'resave': false,
  'saveUninitialized': false
}));

//Middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

//Main menu
const LogInController = require('./controllers/loginController.js');

//Start the app with login page
app.get("/" , LogInController.getLoginPage);

//Routes
const loginRoutes = require('./router/loginRoutes');
const mainRoutes = require('./router/mainRoutes');
const adminRoutes = require('./router/adminRoutes');
//Routes
app.use('/', mainRoutes);
app.use('/', loginRoutes);
app.use('/admin', adminRoutes);

// Handlebars
const hbs = require('hbs');
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//start server
app.listen(port, (req, res) => {  
  console.log( `server listening on port: ${port}`);
})


module.exports=app
