// Libraries
const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const Parser = require('rss-parser');
const parser = new Parser();

// Models
const User = require('../models/user.js');
const Celebrity = require('../models/celebrity.js');

// Controllers
const TwitterCacheController = require("../controllers/twitter-cache.controller");

let TwitterCache = {};

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
	let user = new User();
	user.username = req.body.username;
	User.setPassword(user, req.body.password);
	user.follows = [];
	user.save(function (err, user) {
		if (err) throw err;
		else {
			User.followFirstCeleb(user._id);
			res.json({
				success: true,
				user: {
					id: user._id,
					username: user.username
				}
			});
		}
	});
});

router.post('/authenticate', function(req,res){
	let username = req.body.username;
	let password = req.body.password;

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

// Check for duplicate user
router.get('/checkForUserName/:username', function (req,res) {
	let username = req.params.username;
	User.getUserByUsername(username, function (err,user) {
		if(err) throw err;
		if(user != null) {
			res.json({exists: true})
		}
		else {
			res.json({exists: false})
		}
	})
});

// Get Tweets for a given celebrity
router.get('/getTweets/:user', function (req, res) {
	let user = req.params.user;

	if(TwitterCache[user]) {
		res.send(TwitterCache[user].data);
	} else {
		// next(error)
	}
});

// Get items from the specified rss feeds
router.get('/getRSSFeeds', function(req, res){
	(async () => {
		let urls = ['http://syndication.eonline.com/syndication/feeds/rssfeeds/topstories.xml',
					 'http://www.tmz.com/rss.xml',
					 'http://syndication.eonline.com/syndication/feeds/rssfeeds/redcarpet.xml',
					 'http://syndication.eonline.com/syndication/feeds/rssfeeds/tvnews.xml',
					 'http://syndication.eonline.com/syndication/feeds/rssfeeds/fashion.xml',
					 'http://syndication.eonline.com/syndication/feeds/rssfeeds/style.xml'];

		let feeds = await Promise.all(urls.map(async(url) => await parser.parseURL(url)));

		// Consolidate into one array
		let items = feeds.reduce((acc, item) => acc.concat(item.items), []);

		res.json({data: items});
	})();
});

router.get('/getCelebsTheyFollow/:userId', function(req, res){
	let userId = req.params.userId;
	User.getCelebrities(userId, function(err, celebs){
		if (err) {
			res.json({
				success: false
			});
		} else {
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
	let celebrityId = req.body.celebrityId;
	let userId = req.body.userId;
	let data = {
		celebrityId: celebrityId,
		userId: userId
	};
	User.follow(data, function(){
		res.json({success: true});
	});
});

router.post('/unfollow', function(req, res){
	let celebrityId = req.body.celebrityId;
	let userId = req.body.userId;
	let data = {
		celebrityId: celebrityId,
		userId: userId
	};
	User.unfollow(data, function(){
		res.json({success: true});
	});
});

module.exports = router;
