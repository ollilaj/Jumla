const express = require('express');
const router = express.Router();
const Twitter = require('twitter');
const https = require('https');
const YUI = require('yui').YUI;

// Models
const User = require('../models/user.js');
const Celebrity = require('../models/celebrity.js');

const client = new Twitter({
	consumer_key: 'YqPX7shzZ5kSVPYs1sfzR1sBM',
	consumer_secret: 'MfWjahGj4n7GQMnKJtcpfe9oFWRXXh3v0VLXOO6MTlEpJqnCj9',
	access_token_key: '2564360821-6ff4NGFdrOLMlrDIBxVEh5GKsrwxcl8cDr4ARPI',
	access_token_secret: 'UxFcj1O4h3VgoFjXUyVWAqE6kROcFsZPpVPQQMH9Fnm5B'
});

router.get('/', function(req, res){

	var celeb = new Celebrity();
	celeb.name = "";
	celeb.twitterId = "";
	celeb.save(function(err, celeb){
		if (err) throw err;
		else{
			res.json({success: true});
		}
	});

});

router.post('/register', function(req, res){
	var user = new User();
	user.username = req.body.username;
	User.setPassword(user, req.body.password);
	user.follows = [];
	user.save(function (err, user) {
		if (err) throw err;
		else {
			res.json({
				success: true,
				id: user._id
			});
		}
	});
});

router.post('/authenticate', function(req,res){
	var username = req.body.username;
	var password = req.body.password;

	User.getUserByUsername(username, function(err, user){
		if (err) throw err;
		if (!user) {
			return res.json({success: false, msg: 'User not found'});
		}

		if (User.validPassword(user, password)) {
			return res.json({
				success: true,
				user: {
					id: user._id,
					username: user.username
				}
			});
		} else {
			return res.json({success: false, msg: 'Wrong password'});
		}
	});
});

// Get Tweets for a given celebrity
router.get('/getTweets/:user', function (req, res) {
	var user = req.params.user;
	var params = {screen_name: user, count: '5'};

	client.get('statuses/user_timeline', params, function(error, tweets) {
		if (!error) {
			res.send(tweets);
		}
		else{
			console.log(error);
		}
	});
});

// Get items from the specified rss feeds
router.get('/getRSSFeeds', function(req, res){
	YUI().use('yql', function(Y){
		var query = 'select * from rss where url in (' +
			'"http://syndication.eonline.com/syndication/feeds/rssfeeds/topstories.xml",' +
			'"http://www.tmz.com/rss.xml",' +
			'"http://syndication.eonline.com/syndication/feeds/rssfeeds/redcarpet.xml",' +
			'"http://syndication.eonline.com/syndication/feeds/rssfeeds/tvnews.xml",' +
			'"http://syndication.eonline.com/syndication/feeds/rssfeeds/fashion.xml",' +
			'"http://syndication.eonline.com/syndication/feeds/rssfeeds/style.xml")';

		Y.YQL(query, function(r){
			if(r.query.results){
				res.json({data: r.query.results.item});
			}
		})
	});
});

router.get('/getCelebsTheyFollow/:userId', function(req, res){
	User.getCelebrities(userId, function(err, celebs){
		if (err) throw err;
		else {
			res.json({celebs: celebs});
		}
	});
});

router.get('/getAllCelebrities', function(req, res){
	Celebrity.getAllCelebrities(function(err, celebs){
		if (err) throw err;
		else {
			res.json({celebs: celebs});
		}
	});
});

// Catch all other routes and return no page found
router.get('*', function(req, res) {
	res.send("No page found");
});

module.exports = router;
