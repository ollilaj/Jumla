const db = require('../config/mysql-db-config.js');

let Celebrity = {};

Celebrity.getAll = function(callback) {

	let query = `select * from celebrity`;

	db.query(query, callback);

};

module.exports = Celebrity;
