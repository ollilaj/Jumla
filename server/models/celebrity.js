const mongoose = require("mongoose");

var celebritySchema = mongoose.Schema({
	name: String,
	twitterId: String
});

const Celebrity = module.exports = mongoose.model('Celebrity', celebritySchema);

module.exports.getAllCelebrities = function (callback) {
	Celebrity.find().sort('name').exec(callback);
};
