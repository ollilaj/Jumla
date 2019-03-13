const mysql = require('mysql');

const db = mysql.createConnection({
	host     : process.env.RDS_HOSTNAME,
	user     : process.env.RDS_USERNAME,
	password : process.env.RDS_PASSWORD,
	port     : process.env.RDS_PORT,
	database : process.env.RDS_DB_NAME
});

db.connect((err) => {
	if(err) {
		console.log("Could not connect to the database. Exiting now...");
		process.exit();
	}
	console.log("Successfully connected to the database.");
});

module.exports = db;
