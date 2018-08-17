import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';

@Component({
	selector: 'jumla-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.css'],
	providers: [NewsService]
})
export class NewsComponent implements OnInit {

	public articles = [];

	constructor(private newsService : NewsService) {}

	ngOnInit() {
		this.fetchNews();
	}

	/*
	 * Uses YUI npm package to get all the items in the rss feeds listed
	 */
	fetchNews() : void {
		this.newsService.getFeeds().subscribe(
			(data : any) => {
				this.refineResultsFromFeeds(data);
			}
		)
	}

	refineResultsFromFeeds(rssItems) : void {

		// Fetch celebrities they follow here
		var celebrities = this.fetchFollowedCelebrities();

		for(let rssItem in rssItems) {
			for(let celebrity in celebrities) {

				/*if(rssItem.title.indexOf(celebrity["celeb_name"]) > -1){

					this.articles.push(rssItem)

				}*/

			}
		}

	}

	fetchFollowedCelebrities() : string[] {

		var userId = localStorage.getItem("userId");

		this.newsService.getCelebrities(userId).subscribe(
			(data : any) => {
				console.log(data);
			}
		);

		return [];
	}

}
