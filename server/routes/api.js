// Libraries
const express = require('express');
const cron = require('node-cron');
const Parser = require('rss-parser');

// Models
const User = require("../models/user.js");
const Celebrity = require("../models/celebrity.js");
const Follows = require("../models/follows.js");

// Controllers
const TwitterCacheController = require("../controllers/twitter-cache.controller");
const GetTweetsForAUserController = require("../controllers/get-tweets-for-a-user.controller");

// Vars
const router = express.Router();
const parser = new Parser();

cron.schedule('*/15 * * * *', () => {
	TwitterCacheController.cacheTwitterData();
});

router.post('/register', function(req, res, next){
	let username = req.body.username;
	let password = req.body.password;

	try {
		User.create(username, password, (err, user) => {
			if (err)
				return next(err);

			// Error handle here in the future
			Follows.followFirstCelebs(user.insertId, () => {});

			return res.json({userId: user.insertId});
		});
	} catch (err) {
		return next(err);
	}
});

router.post('/authenticate', function(req, res, next){
	let username = req.body.username;
	let password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
		if (err)
			return next(err);

		if (user.length === 0)
			return next(new Error("User not found"));

		if (!User.isValidPassword(user[0], password))
			return next(new Error("Wrong password"));

		return res.json({userId: user[0].id});
	});
});

// Check for duplicate user
router.get('/checkForUserName/:username', function (req, res, next) {
	let username = req.params.username;

	try {
		User.getUserByUsername(username, (err, user) => {
			if(err)
				return next(err);

			if(user.length > 0)
				return next(new Error("User already exists"));

			return res.json({exists: false})
		});
	} catch (err) {
		return next(err);
	}
});

// Get Tweets for the celebrities that this user follows
router.get('/getTweets/:userId', function (req, res, next) {
	let userId = req.params.userId;

	try {
		GetTweetsForAUserController.getTweets(userId, (err, tweets) => {
			if(err)
				return next(new Error("Could not fetch tweets"));

			return res.json({data: tweets});
		});
	} catch(err) {
		return next(err);
	}
});

// Get items from the specified rss feeds
router.get('/getRSSFeeds', function(req, res, next){
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

router.get('/getCelebsTheyFollow/:userId', function(req, res, next){
	let userId = req.params.userId;

	try {
		Follows.getCelebritiesTheyFollow(userId, (err, celebs) => {
			if (err)
				return next(err);

			return res.json({celebs: JSON.stringify(celebs)});
		});
	} catch(err) {
		return next(err);
	}
});

router.get('/getAllCelebrities', function(req, res, next){
	try {
		Celebrity.getAll((err, celebs) => {
			if (err)
				return next(err);

			return res.json({celebs: JSON.stringify(celebs)});
		});
	} catch(err) {
		return next(err);
	}
});

router.post('/follow', function(req, res, next){
	let userId = req.body.userId;
	let celebrityId = req.body.celebrityId;

	try {
		Follows.create(userId, celebrityId, (err) => {
			if(err)
				return next(err);

			res.json({success: true});
		});
	} catch(err) {
		return next(err);
	}
});

router.post('/unfollow', function(req, res, next){
	let userId = req.body.userId;
	let celebrityId = req.body.celebrityId;

	try {
		Follows.delete(userId, celebrityId, (err) => {
			if(err)
				return next(err);

			res.json({success: true});
		});
	} catch(err) {
		return next(err);
	}
});

module.exports = router;
