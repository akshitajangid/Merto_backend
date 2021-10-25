require("dotenv").config(); 
var fs = require('fs');
const express = require('express');
const app = express();
const path =require('path');
// const https = require('https');?
var cors = require('cors');
var nodemailer = require('nodemailer');
var https = require('https');
var http = require('http');
var multer  = require('multer');
var bodyParser  = require('body-parser');
var upload = multer();


app.get('/', (req, res) => {
 console.log('Running server...................')
});


//user-Merto*******************************************************
const userRouterMerto= require('./api/user.router');

// for parsing application/json
app.use(bodyParser.json()); 
app.use(cors());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use("/video", express.static(path.join(__dirname, 'video')));

//***************************************************************************************
//merto
app.use("/api/",userRouterMerto);

app.listen(3000, () => console.log(`Example app listening on port`,process.env.APP_PORT))

// https.createServer(app).listen(3000, function() {
//     console.log('Express HTTP server listening on port 3000');
// });