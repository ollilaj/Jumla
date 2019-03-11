const db = require('../config/mysql-db-config.js');

let Follows = {};

Follows.create = function(userId, celebrityId, callback) {

	let query = `insert into follows (userId, celebrityId) values (${userId}, ${celebrityId})`;

	db.query(query, callback);

};

Follows.delete = function(userId, celebrityId, callback) {

	let query = `delete from follows where userId = "${userId}" and celebrityId = "${celebrityId}"`;

	db.query(query, callback);

};

Follows.getCelebritiesTheyFollow = function(userId, callback) {

	let query = `select name, twitterHandle from celebrity inner join follows on follows.celebrityId = celebrity.id where follows.userId = "${userId}"`;

	db.query(query, callback);

};

Follows.followFirstCelebs = function(userId, callback) {

	let query = `insert into follows (userId, celebrityId) values (${userId}, 1), (${userId}, 2), (${userId}, 3), (${userId}, 4), (${userId}, 5)`;

	db.query(query, callback);

};

module.exports = Follows;
