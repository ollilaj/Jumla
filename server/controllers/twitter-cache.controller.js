const Twitter = require('twitter');

const client = new Twitter({
	consumer_key: 'lngJCIndH4d6Wfu11eUA2zqZO',
	consumer_secret: 'L7IBYijYJIRL5eyBkejWMpr4JTxuhDJzvVMksK7uou5fcTGI19',
	access_token_key: '2564360821-3LecSMPABhFQfcxXNBaTCe6IKVRsx8C1beNzoRh',
	access_token_secret: 'crpnMwhSOCWGOmnMHoBZbByEXM8otSqTWX0jt58AxtMYy'
});

const Celebrity = require('../models/celebrity.js');

let twitterCache = {};

exports.cacheTwitterData = () => {

	Celebrity.getAllCelebrities(function(err, celebs){
		if (err) throw err;
		else {
			for(let i = 0; i < celebs.length; i++) {
				client.get('statuses/user_timeline', {screen_name: celebs[i].twitterId, count: '5'}, function(twitterError, tweets, responseData) {
					if (twitterError){console.log("Twitter Error: " + twitterError)}
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
