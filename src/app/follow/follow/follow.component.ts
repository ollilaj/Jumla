import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FollowService } from '../follow.service';
import * as $ from 'jquery';
import { NavBarService } from '../../nav-bar/nav-bar.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-follow',
	templateUrl: './follow.component.html',
	styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, AfterViewInit {

	public celebrities = [];

	constructor(private followService : FollowService,
				private navBarService : NavBarService,
				private router: Router) {
	}

	ngOnInit() {
		this.authenticate();
		this.followService.getCelebrities().subscribe(
			(data : any) => {
				this.getFollowedCelebs(data.celebs);
			}
		)
	}

	ngAfterViewInit(){
		setTimeout(_ => {
			this.navBarService.show();
		});
	}

	authenticate() : void {
		var user = localStorage.getItem("user");
		if(!user){
			this.router.navigate(['sign-in']);
		}
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
				}
			}
		}

		this.celebrities = allCelebs;
	}

	follow(event) : void {
		var celebrityId = $(event.target).closest(".celebrity-item").attr("data-celebid");
		var currentUserId = JSON.parse(localStorage.getItem("user")).id;
		var data = {
			celebrityId: celebrityId,
			userId: currentUserId
		};
		this.followService.followCelebrity(data).subscribe(
			(data : any) => {
				this.celebrities.find(celeb => celeb._id === celebrityId).isFollowed = true;
			}
		)
	}

	unfollow(event) : void {
		var celebrityId = $(event.target).closest(".celebrity-item").attr("data-celebid");
		var currentUserId = JSON.parse(localStorage.getItem("user")).id;
		var data = {
			celebrityId: celebrityId,
			userId: currentUserId
		};
		this.followService.unfollowCelebrity(data).subscribe(
			(data : any) => {
				this.celebrities.find(celeb => celeb._id === celebrityId).isFollowed = false;
			}
		)
	}

}
