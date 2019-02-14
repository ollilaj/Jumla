import { Component, Input } from '@angular/core';

@Component({
  selector: 'jumla-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css']
})
export class NewsItemComponent {

	private _article;

	public monthNames = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"
	];

	@Input()
	set article(article : any) {
		let articleDate;
		if(article.date){
			articleDate = article.date;
		} else {
			articleDate = article.pubDate;
		}
		let tempDate = new Date(articleDate);
		article.pubDate = this.monthNames[tempDate.getMonth()] + " " + tempDate.getDate() + ", " + tempDate.getFullYear();

		let source;
		if(article.creator){
			source = "TMZ";
		} else {
			source = "E! Online"
		}
		article.source = source;

		this._article = article;
	}

	get article() {
		return this._article;
	}

}
