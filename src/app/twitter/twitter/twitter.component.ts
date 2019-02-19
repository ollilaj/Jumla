import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TwitterService } from './twitter.service';
import { NavBarService } from '../../nav-bar/nav-bar.service';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'jumla-twitter',
	templateUrl: './twitter.component.html',
	styleUrls: ['./twitter.component.css'],
	providers: [TwitterService]
})
export class TwitterComponent implements OnInit, AfterViewInit, OnDestroy{

	public userId;
	public tweets = [];
	private twitter: any;

	constructor(private twitterService : TwitterService,
				private navBarService : NavBarService,
				private router: Router,
				private toastr: ToastrService){}

	ngOnInit(){
		this.authenticate();
		this.initTwitterWidget();
	}

	ngAfterViewInit(){
		setTimeout(_ => {
			this.navBarService.show();
		});
	}

	ngOnDestroy(){

	}

	authenticate() : void {
		if(!localStorage.getItem("user")){
			this.router.navigate(['sign-in']);
		} else {
			this.userId = JSON.parse(localStorage.getItem("user")).id;
		}
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

		let that = this;
		setTimeout(function(){ that.fetchTweets(); }, 100);
	}

	fetchTweets(): void {
		this.twitterService.getTweets(this.userId).subscribe(
			twitterData => {
				this.tweets = twitterData.data;
				this.sortTweets();
				this.visualizeTweets();
			},
			errorResponse => {
				this.toastr.error(errorResponse.error.message);
			}
		);
	}

	sortTweets() : void {
		this.tweets = this.tweets.sort(function(a,b){
			let c = a.created_at;
			let d = b.created_at;

			return (new Date(c).getTime()) - (new Date(d).getTime());
		});
		this.tweets = this.tweets.reverse();
	}

	visualizeTweets(): void {
		for(let tweet of this.tweets) {
			let newTweet = document.createElement("div");
			newTweet.classList.add("item-twitter");

			let tweetContainer = document.getElementById("tweet-container");
			tweetContainer.appendChild(newTweet);

			(<any>window).twttr.widgets.createTweet(
				tweet.id_str, newTweet,
				{
					conversation : 'none',    // or all
					cards        : 'visible',  // or visible
					align        : 'center'
				}
			);
		}
	}

}

