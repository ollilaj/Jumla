import { Component, OnInit } from '@angular/core';
import { TwitterService } from './twitter.service'

@Component({
	selector: 'jumla-twitter',
	templateUrl: './twitter.component.html',
	styleUrls: ['./twitter.component.css'],
	providers: [TwitterService]
})
export class TwitterComponent implements OnInit{

	user;

	constructor(private twitter : TwitterService){}

	ngOnInit(){
		this.twitter.test().subscribe(
			function(response){ console.log("Successful Response: " + response)},
			function(error){ console.log("Error: " + error)}
		)
	}

}
