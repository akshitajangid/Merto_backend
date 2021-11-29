'use strict';
const queryWrapper = require('./config/database/queryWrapper');
// const databaseSetupSql = require('./config/database/dabaseStatement');
const fs = require('fs');
const express = require('express');
const app = express();

var cors = require('cors');
const { join } = require('path');
const bodyParser = require('body-parser');
//==========================================================================
const session = require('express-session');
// const { flash } = require('express-flash-message');
const flash = require('connect-flash');

app.use(session({
  secret:'geeksforgeeks',
  saveUninitialized: true,
  resave: true
}));

app.use(flash());
// Load routes
app.get('/', (req, res) => {
  req.flash('message', 'Success!!');
  res.redirect('/gfg');
});
  
app.get('/gfg', (req, res) => {
  req.flash('successMessage', 'You are successfully using req-flash');
  res.send(req.flash('successMessage'));
});
//==========================================================================
// Load envs from .env file
if (fs.existsSync('./.env')) {
  require('dotenv').config();
}

const config = require('./config');
const routes = require('./routes');


const log4js = require('./common/logger');

const logger= log4js.getLogger('index');

logger.debug('Starting app with NODE_ENV=%s', config.env);
logger.info(config.env);
// Initialize the app


app.use(cors());

// View engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');    
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');  
  res.header('Access-Control-Allow-Credentials', true); 
  next();
});



// Database connection
const mysqlObject = config.connection.dbConnection;
mysqlObject.connect(function(err) {
  if (err) throw err;
  logger.info('Database is connected.');
  //  Initialize the database.
  // queryWrapper.execute(databaseSetupSql.databaseSetupStatements, function(err, success) {
  //   if (err) throw err;
  //   logger.debug('\nDatabase Setup Success:\n', success);
  // });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(__dirname + '/'));


routes(app);
var server = app.listen(process.env.APP_PORT|| 3006, function () {
 // console.log(server);
  var host = server.address().address
  var port = server.address().port
  //console.log("sdfsd");
  logger.info("Example app listening at http://%s:%s", host, port)
});

module.exports = app;
