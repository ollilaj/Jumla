const mongoose = require("mongoose");
const crypto = require('crypto');
const Celebrity = require('./celebrity.js');

var userSchema = mongoose.Schema({
	username: String,
	hash: String,
	salt: String,
	follows: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' }
	]
});

const User = module.exports = mongoose.model('User', userSchema);

module.exports.getUserById = function (id, callback) {
	User.findById(id, callback);
};

module.exports.getUserByUsername = function (username, callback) {
	const query = {username: username};
	User.findOne(query, callback);
};

module.exports.setPassword = function (user, password) {
	user.salt = crypto.randomBytes(16).toString('hex');
	user.hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
};

module.exports.validPassword = function (user, password) {
	var hash = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
	return user.hash === hash;
};

module.exports.updatePassword = function (user, callback) {

	var newPassword = user.newPassword;

	User.findById(user._id,function (err,user) {
		if(err){
			throw(err);
		}
		User.setPassword(user,newPassword);
		user.save(callback);

	});
};

module.exports.getCelebrities = function (userId, callback) {
	User.findById(userId).populate('follows').exec(callback);
};

module.exports.follow = function (data, callback) {
	User.findByIdAndUpdate(data.userId,
		{$push: {follows: data.celebrityId}},
		{safe: true},
		function (err) {
			if (err) console.log(err);
			callback();
		}
	);
};

module.exports.followFirstCeleb = function (userId) {
	Celebrity.getAllCelebrities(function(err, celebs) {
		User.findByIdAndUpdate(userId,
			{$push: {follows: celebs[1]._id}},
			{safe: true},
			function (err) {
				if (err) console.log(err);
			}
		);
	});
};

module.exports.unfollow = function (data, callback) {
	User.findByIdAndUpdate(data.userId,
		{$pull: {follows: data.celebrityId}},
		{safe: true},
		function (err) {
			if (err) console.log(err);
			callback();
		}
	);
};
