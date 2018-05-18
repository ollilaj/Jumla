const express = require('express');
const router = express.Router();
const Twitter = require('twitter');

const client = new Twitter({
	consumer_key: 'YqPX7shzZ5kSVPYs1sfzR1sBM',
	consumer_secret: 'MfWjahGj4n7GQMnKJtcpfe9oFWRXXh3v0VLXOO6MTlEpJqnCj9',
	access_token_key: '2564360821-6ff4NGFdrOLMlrDIBxVEh5GKsrwxcl8cDr4ARPI',
	access_token_secret: 'UxFcj1O4h3VgoFjXUyVWAqE6kROcFsZPpVPQQMH9Fnm5B'
});


router.get('/', function (req, res) {
	res.send('api works');
});

router.get('/twitter/test', function (req, res) {

	var params = {screen_name: 'jakeollila'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
		if (!error) {
			console.log(tweets);
		}
		else{
			console.log(error);
		}
	});

});

// Catch all other routes and return no page found
router.get('*', function(req, res) {
	res.send("No page found");
});

module.exports = router;
