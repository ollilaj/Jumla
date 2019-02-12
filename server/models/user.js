const mongoose = require("mongoose");
const crypto = require('crypto');
const Celebrity = require('./celebrity.js');

let userSchema = mongoose.Schema({
	username: String,
	hash: String,
	salt: String,
	follows: [
		{type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' }
	]
});

const User = module.exports = mongoose.model('User', userSchema);

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

module.exports.updatePassword = function (user, callback) {
	let newPassword = user.newPassword;
	User.findOne({_id: user._id}, function (err,user) {
		if (err) throw (err);
		User.setPassword(user,newPassword);
		user.save(callback);
	});
};

module.exports.getCelebrities = function (userId, callback) {
	User.findOne({_id: userId})
		.populate('follows')
		.exec(function (err, celebs) {
			if (err) throw (err);
			callback(err, celebs);
		});
};

module.exports.follow = function (data, callback) {
	User.findOneAndUpdate({_id: data.userId},
		{$push: {follows: data.celebrityId}},
		{safe: true},
		function (err) {
			if (err) throw (err);
			callback();
		}
	);
};

module.exports.followFirstCeleb = function (userId) {
	Celebrity.getAllCelebrities(function(err, celebs) {
		User.findOneAndUpdate({_id: userId},
			{$push: {follows: celebs[1]._id}},
			{safe: true},
			function (err) {
				if (err) throw (err);
			}
		);
	});
};

module.exports.unfollow = function (data, callback) {
	User.findOneAndUpdate({_id: data.userId},
		{$pull: {follows: data.celebrityId}},
		{safe: true},
		function (err) {
			if (err) throw (err);
			callback();
		}
	);
};
