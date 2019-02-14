// Libraries
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");

// Vars
const app = express();
const api = require('./server/routes/api.js');
const TwitterCacheController = require("../controllers/twitter-cache.controller");

TwitterCacheController.cacheTwitterData();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Dist Folder Location
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Send Error back to client
app.use(function(err, req, res) {
	console.log("Error triggered");
	let status = err.status || 500;
	let message = err.message || 'Unknown Error';
	return res.status(status).send(message);
});

// Redirect all other routes to Angular
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start express server
app.listen(3000, function(){
	console.log("Server is listening on port 3000");
});

// Database Configuration
let dbConfig = require("./server/config/database-config.js");
let mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, { useNewUrlParser: true });

mongoose.connection.on('error', function(){
	console.log("Could not connect to the database. Exiting now...");
	process.exit();
});

mongoose.connection.once('open', function(){
	console.log("Successfully connected to the database.");
});
