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

var TwitterCache = {};

// Used to create the celebrity data
router.get('/createCelebrityData', function(req, res){

	var celebrities = ["Adele",
		"Ariana Grande",
		"Ashley Benson",
		"Bella Hadid",
		"Beyonce",
		"Bruno Mars",
		"Cara Delevingne",
		"Chance the Rapper",
		"Christina Aguilera",
		"Ciara",
		"Dan Bilzerian",
		"Demi Lovato",
		"Drake",
		"Ed Sheeran",
		"Ellie Goulding",
		"Elon Musk",
		"Eminem",
		"Emma Watson",
		"Floyd Mayweather",
		"Gigi Hadid",
		"Harry Styles",
		"Jennifer Lopez",
		"Jimmy Fallon",
		"Justin Bieber",
		"Justin Timberlake",
		"Katy Perry",
		"Kendall Jenner",
		"Kevin Hart",
		"Kim Kardashian",
		"Kylie Jenner",
		"Lady Gaga",
		"Leonardo DiCaprio",
		"Lil Wayne",
		"Lucy Hale",
		"Mariah Carey",
		"Miley Ray Cyrus",
		"Niall Horan",
		"Nicki Minaj",
		"P!nk",
		"Rihanna",
		"Scott Disick",
		"Selena Gomez",
		"Shakira",
		"Snoop Dogg",
		"Taylor Swift",
		"Vanessa Hudgens",
		"Zac Efron",
		"Zayn",
		"Zendaya"
	];
	var twitterNames = ["adele",
		"arianagrande",
		"ashbenzo",
		"bellahadid",
		"beyonce",
		"brunomars",
		"caradelevingne",
		"chancetherapper",
		"xtina",
		"ciara",
		"danbilzerian",
		"ddlovato",
		"drake",
		"edsheeran",
		"elliegoulding",
		"elonmusk",
		"eminem",
		"emmawatson",
		"floydmayweather",
		"gigihadid",
		"harry_styles",
		"jlo",
		"jimmyfallon",
		"justinbieber",
		"jtimberlake",
		"katyperry",
		"kendalljenner",
		"kevinhart4real",
		"kimkardashian",
		"kyliejenner",
		"ladygaga",
		"leodicaprio",
		"liltunechi",
		"lucyhale",
		"mariahcarey",
		"mileycyrus",
		"niallofficial",
		"nickiminaj",
		"pink",
		"rihanna",
		"scottdisick",
		"selenagomez",
		"shakira",
		"snoopdogg",
		"taylorswift13",
		"vanessahudgens",
		"zacefron",
		"zaynmalik",
		"zendaya"
	];

	var celeb;

	/*for(var i = 0; i < celebrities.length; i++) {
		celeb = new Celebrity();
		celeb.name = celebrities[i];
		celeb.twitterId = twitterNames[i];
		celeb.save(function(err){
			if (err) throw err;
		});
	}*/

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

	var currentTime = new Date().getTime();

	// Checks if the cached data is less than 15 minutes old
	if(TwitterCache[user] && ((currentTime - TwitterCache[user].storedAt) < 1000000)) {
		res.send(TwitterCache[user].data);
	}
	else {
		client.get('statuses/user_timeline', params, function(error, tweets) {
			if (!error) {
				TwitterCache[user] = {
					storedAt: new Date().getTime(),
					data: tweets
				};
				res.send(tweets);
			}
			else {
				console.log(error);
			}
		});
	}
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
	var userId = req.params.userId;
	User.getCelebrities(userId, function(err, celebs){
		if (err) throw err;
		else {
			res.json({
				success: true,
				celebs: celebs.follows
			});
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

router.post('/follow', function(req, res){
	var celebrityId = req.body.celebrityId;
	var userId = req.body.userId;
	var data = {
		celebrityId: celebrityId,
		userId: userId
	};
	User.follow(data, function(){
		res.json({success: true});
	});
});

router.post('/unfollow', function(req, res){
	var celebrityId = req.body.celebrityId;
	var userId = req.body.userId;
	var data = {
		celebrityId: celebrityId,
		userId: userId
	};
	User.unfollow(data, function(){
		res.json({success: true});
	});
});

// Catch all other api routes and return no page found
router.get('*', function(req, res) {
	res.send("No page found");
});

module.exports = router;
