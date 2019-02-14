import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TwitterService } from './twitter.service';
import * as $ from 'jquery';
import { NavBarService } from '../../nav-bar/nav-bar.service';

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
				private router: Router){}

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
		this.twitterService.getCelebsTheyFollow(this.userId).subscribe(
			celebs => {
				if(celebs.celebs.length > 0) {
					this.twitterService.getTweets(celebs.celebs).subscribe(
						(twitterData : any) => {
							this.tweets = this.concatArrays(twitterData);
							this.sortTweets();
							this.visualizeTweets();
						}
					);
				}
			},
			error => {
				//toastr.error(error.message);
			}
		)
	}

	concatArrays(arrays) : any[] {
		let singleArray = [];
		for(let array of arrays) {
			singleArray = singleArray.concat(array);
		}
		return singleArray;
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

