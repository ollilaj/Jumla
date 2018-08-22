import { Component, OnInit } from '@angular/core';
import { TwitterService } from './twitter.service';
import * as $ from 'jquery';

@Component({
	selector: 'jumla-twitter',
	templateUrl: './twitter.component.html',
	styleUrls: ['./twitter.component.css'],
	providers: [TwitterService]
})
export class TwitterComponent implements OnInit{

	public tweets = [];
	private twitter: any;

	constructor(private twitterService : TwitterService){}

	ngOnInit(){
		this.initTwitterWidget();
	}

	initTwitterWidget() {
		(<any>window).twttr = (function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0],
				t = (<any>window).twttr || {};
			if (d.getElementById(id)) return t;
			js = d.createElement(s);
			js.id = id;
			js.src = "https://platform.twitter.com/widgets.js";
			fjs.parentNode.insertBefore(js, fjs);

			t._e = [];
			t.ready = function(f) {
				t._e.push(f);
			};

			return t;
		}(document, "script", "twitter-wjs"));
		this.fetchTweets();
	}

	fetchTweets(): void {
		var userId = JSON.parse(localStorage.getItem("user")).id;
		this.twitterService.getCelebsTheyFollow(userId).subscribe(
			(celebData : any) => {
				this.twitterService.getTweets(celebData.celebs).subscribe(
					(twitterData : any) => {
						this.tweets = this.concatArrays(twitterData);
						this.sortTweets();
						this.visualizeTweets();
					}
				);
			}
		)
	}

	concatArrays(arrays) : any[] {
		var singleArray = [];
		for(let array of arrays) {
			singleArray = singleArray.concat(array);
		}
		return singleArray;
	}

	sortTweets() : void {
		this.tweets = this.tweets.sort(function(a,b){
			var c = a.created_at;
			var d = b.created_at;

			return (new Date(c).getTime()) - (new Date(d).getTime());
		});
		this.tweets = this.tweets.reverse();
	}

	visualizeTweets(): void {
		for(let tweet of this.tweets) {
			var newTweet = document.createElement("div");
			newTweet.classList.add("item-twitter");
			newTweet.style.width = '500px';
			newTweet.style.margin = 'auto';
			newTweet.style.padding = '25px 0';

			var tweetContainer = document.getElementById("tweet-container");
			tweetContainer.appendChild(newTweet);

			(<any>window).twttr.widgets.createTweet(
				tweet.id_str, newTweet,
				{
					conversation : 'none',    // or all
					cards        : 'visible'  // or visible
				}
			);
		}
	}

}

