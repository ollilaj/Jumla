const mongoose = require("mongoose");
const Celebrity = require('./celebrity.js');
const crypto = require('crypto');

let userSchema = mongoose.Schema({
	username: String,
	hash: String,
	salt: String,
	follows: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' }
	]
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.create = function(username, password, callback) {
	let user = new User();
	user.username = username;
	User.setPassword(user, password);
	user.follows = [];
	user.save(callback);
};

module.exports.getUserById = function (id, callback) {
	User.findOne({_id: id}, callback);
};

module.exports.getUserByUsername = function (username, callback) {
	User.findOne({username: username}, callback);
};

module.exports.setPassword = function (user, password) {
	user.salt = crypto.randomBytes(16).toString('hex');
	user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
};

module.exports.validPassword = function (user, password) {
	let hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
	return user.hash === hash;
};

/*
module.exports.updatePassword = function (user, callback) {
	let newPassword = user.newPassword;
	User.findOne({_id: user._id}, function (err,user) {
		if (err) throw (err);
		User.setPassword(user,newPassword);
		user.save(callback);
	});
};
*/

module.exports.getCelebritiesTheyFollow = function (userId, callback) {
	User.findOne({_id: userId})
		.populate('follows')
		.exec(callback);
};

module.exports.follow = function (userId, celebrityId, callback) {
	User.findOneAndUpdate(
		{_id: userId},
		{$push: {follows: celebrityId}},
		{safe: true},
		callback
	);
};

module.exports.unfollow = function (userId, celebrityId, callback) {
	User.findOneAndUpdate(
		{_id: userId},
		{$pull: {follows: celebrityId}},
		{safe: true},
		callback
	);
};

module.exports.followFirstCelebs = function (userId) {
	Celebrity.getAllCelebrities(function(err, celebs) {
		User.findOneAndUpdate(
			{_id: userId},
			{$push: {follows: {$each: [celebs[0]._id, celebs[1]._id, celebs[2]._id,celebs[3]._id, celebs[4]._id]}}},
			{safe: true},
			(err) => {
				if(err) {console.log(err)}
				else {console.log("Added default celebs to follows field.")}
			}
		);
	});
};
