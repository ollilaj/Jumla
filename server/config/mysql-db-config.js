const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: process.env.MYSQL_PASSWORD,
	database: 'jumla'
});

db.connect((err) => {
	if(err) {
		console.log("Could not connect to the database. Exiting now...");
		process.exit();
	}
	console.log("Successfully connected to the database.");
});

module.exports = db;
