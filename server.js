// Importing the required modules
const express = require('express');
const app = express();
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested With, Content-Type, Accept');
  next();
});


// Database connection
const mongoDB = require('./controller/db_connection');
const connection = mongoDB.connection;

// Routes for the app
const indexRoute = require('./routes/index');
const urlRoute = require('./routes/routeURL');
const redirect = require('./routes/redirect');

// Setting the port
const port = process.env.PORT || 3000;

// Setting the view engine
app.set('view engine', 'pug');
// Setting the views directory
app.set('views', path.join(__dirname, 'views'));

// Setting the public directory and BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public' ,express.static(path.join(__dirname, 'public')));

// Setting the routes
// app.use(homeRoute);
// app.use(userRoute);
app.use(indexRoute);
app.use(urlRoute);
app.use(redirect);
// app.use(home);
// 404 error
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});


// Starting the server
app.listen(port, () => {
  connection.once('open', () => console.log('DB Connected'))
  connection.on('error', () => console.log('Error'))
  console.log(`Server is running on port ${port}`);
});