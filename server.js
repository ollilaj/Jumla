// Libraries
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// Vars
const app = express();
const api = require('./server/routes/api.js');
const TwitterCacheController = require("./server/controllers/twitter-cache.controller");
const port = process.env.PORT || 3000;

TwitterCacheController.cacheTwitterData();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Dist Folder Location
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Send Error back to client
app.use(function(err, req, res, next) {
	let status = err.status || 500;
	let message = err.message || 'Unknown Error';
	return res.status(status).send({message: message});
});

// Redirect all other routes to Angular
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start express server
app.listen(port, function(){
	console.log("Server is listening on port " + process.env.NODE_PORT);
});

process.on('uncaughtException', function (err) {
	console.log('uncaughtException: ' + err.message);
	console.log(err.stack);
});
