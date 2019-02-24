import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { TwitterService } from './twitter.service';
import { NavBarService } from '../../nav-bar/nav-bar.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingIconService } from "../../loading-icon/loading-icon.service";

@Component({
	selector: 'jumla-twitter',
	templateUrl: './twitter.component.html',
	styleUrls: ['./twitter.component.css'],
	providers: [TwitterService]
})
export class TwitterComponent implements OnInit, AfterViewInit{

	public userId;
	public tweets = [];
	private twitter: any;

	constructor(private twitterService : TwitterService,
				private navBarService : NavBarService,
				private router: Router,
				private toastr: ToastrService,
				private loadingIconService : LoadingIconService){}

	ngOnInit(){
		this.authenticate();
		this.loadingIconService.startLoading();
	}

	ngAfterViewInit(){
		setTimeout(() => {this.navBarService.show()});
		this.initializeTwitterWidget();
		(<any>window).twttr.ready(() => { this.fetchTweets() });
	}

	authenticate() : void {
		if(!localStorage.getItem("user")){
			this.router.navigate(['sign-in']);
		} else {
			this.userId = JSON.parse(localStorage.getItem("user")).id;
		}
	}

	initializeTwitterWidget() {
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
	}

	fetchTweets(): void {
		this.twitterService.getTweets(this.userId).subscribe(
			twitterData => {
				this.tweets = twitterData.data;
				this.sortTweets();
				this.displayTweets();
			},
			errorResponse => {
				this.loadingIconService.stopLoading();
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

	displayTweets(): void {
		let promiseStack = [];

		for(let tweet of this.tweets) {
			let newTweet = document.createElement("div");
			newTweet.classList.add("item-twitter");

			let tweetContainer = document.getElementById("tweet-container");
			tweetContainer.appendChild(newTweet);

			promiseStack.push((<any>window).twttr.widgets.createTweet(
				tweet.id_str, newTweet,
				{
					conversation : 'none',    // or all
					cards        : 'visible',  // or visible
					align        : 'center'
				}
			));
		}

		Promise.all(promiseStack).then(() => {
			this.loadingIconService.stopLoading();
		}, (err) => {
			this.loadingIconService.stopLoading();
			this.toastr.error(err);
		});
	}

}

