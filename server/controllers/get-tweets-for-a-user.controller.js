const Follows = require('../models/Follows');

const TwitterCacheController = require("./twitter-cache.controller");

exports.getTweets = (userId, callback) => {

	Follows.getCelebritiesTheyFollow(userId, function(err, celebs){
		if (err) return callback(err);
		else {
			let twitterCache = TwitterCacheController.getTwitterCache();
			let tweetsFromTheCelebsThisUserFollows = [];

			for(let i = 0; i < celebs.length; i++) {
				Array.prototype.push.apply(tweetsFromTheCelebsThisUserFollows, twitterCache[celebs[i].twitterHandle].data);
			}

			return callback(null, tweetsFromTheCelebsThisUserFollows);
		}
	});

};
