const Twitter = require('twitter');

const client = new Twitter({
	consumer_key: 'YqPX7shzZ5kSVPYs1sfzR1sBM',
	consumer_secret: 'MfWjahGj4n7GQMnKJtcpfe9oFWRXXh3v0VLXOO6MTlEpJqnCj9',
	access_token_key: '2564360821-6ff4NGFdrOLMlrDIBxVEh5GKsrwxcl8cDr4ARPI',
	access_token_secret: 'UxFcj1O4h3VgoFjXUyVWAqE6kROcFsZPpVPQQMH9Fnm5B'
});

const Celebrity = require('../models/celebrity.js');

let TwitterCache = {};

exports.cacheTwitterData = () => {

	Celebrity.getAllCelebrities(function(err, celebs){
		if (err) throw err;
		else {
			for(let i = 0; i < celebs.length; i++) {
				client.get('statuses/user_timeline', {screen_name: celebs[i], count: '5'}, function(error, tweets, responseData) {
					if (!error) {
						TwitterCache[user] = {
							storedAt: new Date().getTime(),
							data: tweets
						};
					}
					else {
						console.log(error);
					}
				});
			}
		}
	});

};
