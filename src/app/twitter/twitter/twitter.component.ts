import { Component, OnInit } from '@angular/core';
import { TwitterService } from './twitter.service';
import { TwitterItemComponent } from '../twitter-item/twitter-item.component'

@Component({
	selector: 'jumla-twitter',
	templateUrl: './twitter.component.html',
	styleUrls: ['./twitter.component.css'],
	providers: [TwitterService]
})
export class TwitterComponent implements OnInit{

	public tweets: any[];

	constructor(private twitter : TwitterService){}

	ngOnInit(){

		this.fetchTweets();

	}

	fetchTweets(): void {

		this.twitter.getTweets('rihanna').subscribe(
			(response: any[]) => {

				this.tweets = response

			}
		)

	}

}

