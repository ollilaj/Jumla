const db = require('../config/mysql-db-config.js');
const crypto = require('crypto');

let User = {};

User.create = function(username, password, callback) {

	let salt = crypto.randomBytes(16).toString('hex');
	let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');

	let query = `insert into user (username, salt, hash) values ("${username}", "${salt}", "${hash}")`;

	db.query(query, callback);

};

User.getUserById = function(id, callback) {

	let query = `select * from user where id = ${id}`;

	db.query(query, callback);

};

User.getUserByUsername = function(username, callback) {

	let query = `select * from user where username = "${username}"`;

	db.query(query, callback);

};

User.isValidPassword = function(user, password) {

	let hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
	return user.hash === hash;

};

module.exports = User;
