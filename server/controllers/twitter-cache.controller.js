const Twitter = require('twitter');

const client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});

const Celebrity = require('../models/celebrity.js');

let twitterCache = {};

exports.cacheTwitterData = () => {

	Celebrity.getAllCelebrities(function(err, celebs){
		if (err) throw err;
		else {
			for(let i = 0; i < celebs.length; i++) {
				client.get('statuses/user_timeline', {screen_name: celebs[i].twitterId, count: '5'}, function(twitterError, tweets, responseData) {
					if (twitterError){console.log(twitterError)}
					else {
						twitterCache[celebs[i].twitterId] = {
							storedAt: new Date().getTime(),
							data: tweets
						};
					}
				});
			}
		}
	});

};

exports.getTwitterCache = () => {
	return twitterCache;
};
