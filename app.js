const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var dbConn = require("./src/config/dbConn"); // Database connection file
const session = require('express-session');

// Import Routers
var indexRouter = require('./routes/index');
var studentRouter = require('./routes/studentRoute');
var classRouter = require('./routes/classRoute');
var teacherRouter = require('./routes/teacherRoute');
var adminRouter = require('./routes/adminRoute');


// Import Admin Initialization Function
const { initializeAdmin } = require('./src/controllers/adminController'); 

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'bnmjhkuiy78979grdsr54w', // Replace with a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }, // Set to true if you're using HTTPS
}));

// Routes
app.use('/', indexRouter);
app.use('/student', studentRouter);
app.use('/class', classRouter);
app.use('/teacher', teacherRouter);
app.use('/admin', adminRouter);


// Initialize admin when the database connection is open
dbConn.once('open', async () => {
  console.log('Database connection is open');
  try {
    await initializeAdmin(); // Initialize the first admin
  } catch (error) {
    console.error('Error during admin initialization:', error.message);
  }
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
