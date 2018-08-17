const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const app = express();
const api = require('./server/routes/api.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Start express server
app.listen(3000, function(){
	console.log("Server is listening on port 3000");
});

// Database Configuration
var dbConfig = require("./server/config/database-config.js");
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true });

mongoose.connection.on('error', function(){
	console.log("Could not connect to the database. Exiting now...");
	process.exit();
});

mongoose.connection.once('open', function(){
	console.log("Successfully connected to the database.");
});
