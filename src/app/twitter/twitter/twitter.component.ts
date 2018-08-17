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

		this.twitterService.getTweets('rihanna').subscribe(
			(response : any[]) => {

				this.tweets = response;
				this.visualizeTweets();

			}
		)

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

