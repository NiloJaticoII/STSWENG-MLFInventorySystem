'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
const express = require('express')
const app = express()
const path = require('path');

/*
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
*/

app.use(express.static(__dirname + '/public'));

//Main menu
const MainController = require('./controllers/mainController');

//Start the app with login page
app.get("/" , MainController.getMain);

//Routes
const loginRoutes = require('./router/loginRoutes');
const mainRoutes = require('./router/mainRoutes');
//Routes
app.use('/', mainRoutes);
app.use('/login', loginRoutes);

app.listen(port, () => {
  console.log('App listening at : localhost:' + port)
})
