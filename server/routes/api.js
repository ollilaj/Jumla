// Libraries
const express = require('express');
const cron = require('node-cron');
const Parser = require('rss-parser');

// Models
const User = require('../models/user.js');
const Celebrity = require('../models/celebrity.js');

// Controllers
const TwitterCacheController = require("../controllers/twitter-cache.controller");

// Vars
const router = express.Router();
const parser = new Parser();

cron.schedule('*/15 * * * *', () => {
	TwitterCacheController.cacheTwitterData();
});

// Used to create the celebrity data
router.get('/createCelebrityData', function(req, res){

	let celebrities = ["Adele",
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
	let twitterNames = ["adele",
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

	let celeb;

	/*for(let i = 0; i < celebrities.length; i++) {
		celeb = new Celebrity();
		celeb.name = celebrities[i];
		celeb.twitterId = twitterNames[i];
		celeb.save(function(err){
			if (err) throw err;
		});
	}*/

});

router.post('/register', function(req, res){
	let username = req.body.username;
	let password = req.body.password;
	User.create(username, password, function(err, user) {
		if (err)
			return next(err);

		User.followFirstCelebs(user._id);

		return res.json({user: {id: user._id, username: user.username}});
	});
});

router.post('/authenticate', function(req,res){
	let username = req.body.username;
	let password = req.body.password;

	User.getUserByUsername(username, function(err, user){
		if (err)
			return next(err);

		if (!user)
			return next(new Error("User not found"));

		if (!User.validPassword(user, password))
			return next(new Error("Wrong password"));

		return res.json({user: {id: user._id, username: user.username}});
	});
});

// Check for duplicate user
router.get('/checkForUserName/:username', function (req,res) {
	let username = req.params.username;
	try {
		User.getUserByUsername(username, function (err, user) {
			if(err)
				return next(err);

			if(user)
				return next(new Error("User already exists"));

			return res.json({exists: false})
		});
	} catch (err) {
		return next(err);
	}
});

// Get Tweets for a given celebrity
router.get('/getTweets/:user', function (req, res) {
	let user = req.params.user;
	try {
		let twitterCache = TwitterCacheController.getTwitterCache();
		if(twitterCache[user])
			return res.json({data: twitterCache[user].data});

		return next(new Error("No cached data for Twitter"));
	} catch(err) {
		return next(err);
	}
});

// Get items from the specified rss feeds
router.get('/getRSSFeeds', function(req, res){
	try {
		(async () => {
			let urls = ['http://syndication.eonline.com/syndication/feeds/rssfeeds/topstories.xml',
				'http://www.tmz.com/rss.xml',
				'http://syndication.eonline.com/syndication/feeds/rssfeeds/redcarpet.xml',
				'http://syndication.eonline.com/syndication/feeds/rssfeeds/tvnews.xml',
				'http://syndication.eonline.com/syndication/feeds/rssfeeds/fashion.xml',
				'http://syndication.eonline.com/syndication/feeds/rssfeeds/style.xml'];

			// Awaits all async requests for feeds to return
			let feeds = await Promise.all(urls.map(async(url) => await parser.parseURL(url)));

			// Consolidate into one array
			let items = feeds.reduce((acc, item) => acc.concat(item.items), []);

			return res.json({data: items});
		})();
	} catch(err) {
		return next(err);
	}
});

router.get('/getCelebsTheyFollow/:userId', function(req, res){
	let userId = req.params.userId;
	try {
		User.getCelebrities(userId, function(err, celebs){
			if (err)
				return next(err);

			return res.json({celebs: celebs.follows});
		});
	} catch(err) {
		return next(err);
	}
});

router.get('/getAllCelebrities', function(req, res){
	try {
		Celebrity.getAllCelebrities(function(err, celebs){
			if (err)
				return next(err);

			return res.json({celebs: celebs});
		});
	} catch(err) {
		return next(err);
	}
});

router.post('/follow', function(req, res){
	let userId = req.body.userId;
	let celebrityId = req.body.celebrityId;
	try {
		User.follow(userId, celebrityId, function(err){
			if(err)
				return next(err);

			res.json({success: true});
		});
	} catch(err) {
		return next(err);
	}
});

router.post('/unfollow', function(req, res){
	let userId = req.body.userId;
	let celebrityId = req.body.celebrityId;
	try {
		User.unfollow(userId, celebrityId, function(err){
			if(err)
				return next(err);

			res.json({success: true});
		});
	} catch(err) {
		return next(err);
	}
});

module.exports = router;
