const User = require('./user.js');

const TwitterCacheController = require("./twitter-cache.controller");

exports.getTweets = (userId, callback) => {

	User.getCelebritiesTheyFollow(userId, function(err, celebs){
		if (err) return callback(err);
		else {
			let celebsTheyFollow = celebs.follows;
			let twitterCache = TwitterCacheController.getTwitterCache();
			let tweetsFromTheCelebsThisUserFollows = [];

			for(let i = 0; i < celebsTheyFollow.length; i++) {
				Array.prototype.push.apply(tweetsFromTheCelebsThisUserFollows,
					twitterCache[celebsTheyFollow[i].twitterId].data);
			}

			return callback(null, tweetsFromTheCelebsThisUserFollows);
		}
	});

};
