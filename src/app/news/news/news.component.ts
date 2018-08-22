import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';
import { Observable } from 'rxjs/Observable';

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
			(response : any) => {
				this.refineResultsFromFeeds(response.data);
			}
		)
	}

	refineResultsFromFeeds(rssItems) : void {
		rssItems = this.sortRSSItems(rssItems);
		var userId = JSON.parse(localStorage.getItem("user")).id;
		this.newsService.getCelebrities(userId).subscribe(
			(data : any) => {
				if(data.success && data.celebs.length > 0) {
					var celebrities = data.celebs;
					for(var i = 0; i < rssItems.length; i++) {
						for(var j = 0; j < celebrities.length; j++) {
							if(rssItems[i].title.indexOf(celebrities[j].name) > -1){
								this.articles.push(rssItems[i]);
							}
						}
					}
				} else {
					alert("Error: Couldn't find followed Celebrities");
					return [];
				}
			}
		);
	}

	sortRSSItems(rssItems) : any[] {
		var orderedArray = rssItems.sort(function(a,b){
			var c;
			var d;

			if(a.date){
				c = a.date;
			} else {
				c = a.pubDate;
			}

			if(b.date){
				d = b.date;
			} else {
				d = b.pubDate;
			}

			return (new Date(c).getTime()) - (new Date(d).getTime());
		});

		return orderedArray.reverse();
	}

}
