import { Component, OnInit } from '@angular/core';
import { FollowService } from '../follow.service';

@Component({
	selector: 'app-follow',
	templateUrl: './follow.component.html',
	styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

	public celebrities = [];

	constructor(private followService : FollowService) {
	}

	ngOnInit() {
		this.followService.getCelebrities().subscribe(
			(data : any) => {
				this.getFollowedCelebs(data.celebs);
			}
		)
	}

	getFollowedCelebs(allCelebs) : void {
		var userString = localStorage.getItem("user");
		var userId = JSON.parse(userString).id;
		this.followService.getCelebsTheyFollow(userId).subscribe(
			(data : any) => {
				if(data.celebs && data.celebs.length > 0) {
					this.setFollowedCelebs(allCelebs, data.celebs);
				} else {
					this.celebrities = allCelebs;
				}
				console.log(this.celebrities);
			}
		)
	}

	setFollowedCelebs(allCelebs, followedCelebs) : void {

		var currentCelebId, currentFollowedCelebId;
		for(var i = 0; i < allCelebs.length; i++) {
			currentCelebId = allCelebs[i]._id;
			for(var j = 0; j < followedCelebs.length; j++) {
				currentFollowedCelebId = followedCelebs[j]._id;

				if(currentCelebId == currentFollowedCelebId){
					allCelebs[i].isFollowed = true;
				} else {
					allCelebs[i].isFollowed = false;
				}
			}
		}

		this.celebrities = allCelebs;
	}

}
