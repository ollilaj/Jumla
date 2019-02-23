import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NewsService } from './news.service';
import { Router } from '@angular/router';
import { NavBarService } from '../../nav-bar/nav-bar.service';
import { ToastrService } from 'ngx-toastr';
import { LoadingIconService } from "../../loading-icon/loading-icon.service";

@Component({
	selector: 'jumla-news',
	templateUrl: './news.component.html',
	styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, AfterViewInit {

	public userId;
	public articles = [];

	constructor(private newsService : NewsService,
				private navBarService : NavBarService,
				private router: Router,
				private toastr: ToastrService,
				private loadingIconService : LoadingIconService) {}

	ngOnInit() {
		this.authenticate();
		this.loadingIconService.startLoading();
		this.fetchNews();
	}

	ngAfterViewInit(){
		setTimeout(_ => {
			this.navBarService.show();
		});
	}

	authenticate() : void {
		if(!localStorage.getItem("user")){
			this.router.navigate(['sign-in']);
		} else {
			this.userId = JSON.parse(localStorage.getItem("user")).id;
		}
	}

	/*
	 * Uses YUI npm package to get all the items in the rss feeds listed
	 */
	fetchNews() : void {
		this.newsService.getFeeds().subscribe(
			data => {
				if(data.data.length > 0) {
					this.refineResultsFromFeeds(data.data);
				}
			},
			errorResponse => {
				this.loadingIconService.stopLoading();
				this.toastr.error(errorResponse.error.message);
			}
		)
	}

	refineResultsFromFeeds(rssItems) : void {
		rssItems = this.sortRSSItems(rssItems);

		this.newsService.getCelebrities(this.userId).subscribe(
			celebs => {
				if(celebs.celebs.length > 0) {
					let celebrities = celebs.celebs;
					for(let i = 0; i < rssItems.length; i++) {
						for(let j = 0; j < celebrities.length; j++) {
							if(rssItems[i].title.indexOf(celebrities[j].name) > -1){
								this.articles.push(rssItems[i]);
							}
						}
					}
				}
				this.loadingIconService.stopLoading();
			},
			errorResponse => {
				this.loadingIconService.stopLoading();
				this.toastr.error(errorResponse.error.message);
			}
		);
	}

	sortRSSItems(rssItems) : any[] {
		let orderedArray = rssItems.sort(function(a,b){
			let c;
			let d;

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
