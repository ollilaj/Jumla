import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FollowService } from '../follow.service';
import * as $ from 'jquery';
import { NavBarService } from '../../nav-bar/nav-bar.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-follow',
	templateUrl: './follow.component.html',
	styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit, AfterViewInit {

	public celebrities = [];

	constructor(private followService : FollowService,
				private navBarService : NavBarService,
				private router: Router,
				private toastr: ToastrService) {
	}

	ngOnInit() {
		this.authenticate();
		this.followService.getCelebrities().subscribe(
			 celebs => {
				this.getFollowedCelebs(celebs.celebs);
			},
			error => {
			 	this.toastr.error(error.message);
			}
		)
	}

	ngAfterViewInit(){
		setTimeout(_ => {
			this.navBarService.show();
		});
	}

	authenticate() : void {
		if(!localStorage.getItem("user")){
			this.router.navigate(['sign-in']);
		}
	}

	getFollowedCelebs(allCelebs) : void {
		let userString = localStorage.getItem("user");
		let userId = JSON.parse(userString).id;
		this.followService.getCelebsTheyFollow(userId).subscribe(
			celebs => {
				if(celebs.celebs && celebs.celebs.length > 0) {
					this.setFollowedCelebs(allCelebs, celebs.celebs);
				} else {
					this.celebrities = allCelebs;
				}
			},
			error => {
				this.toastr.error(error.message);
			}
		)
	}

	setFollowedCelebs(allCelebs, followedCelebs) : void {

		let currentCelebId, currentFollowedCelebId;
		for(let i = 0; i < allCelebs.length; i++) {
			currentCelebId = allCelebs[i]._id;
			for(let j = 0; j < followedCelebs.length; j++) {
				currentFollowedCelebId = followedCelebs[j]._id;

				if(currentCelebId == currentFollowedCelebId){
					allCelebs[i].isFollowed = true;
				}
			}
		}

		this.celebrities = allCelebs;
	}

	follow(event) : void {
		let celebrityId = $(event.target).closest(".celebrity-item").attr("data-celebid");
		let currentUserId = JSON.parse(localStorage.getItem("user")).id;
		let data = {
			celebrityId: celebrityId,
			userId: currentUserId
		};
		this.followService.followCelebrity(data).subscribe(
			success => {
				this.celebrities.find(celeb => celeb._id === celebrityId).isFollowed = true;
			},
			error => {
				this.toastr.error(error.message);
			}
		)
	}

	unfollow(event) : void {
		let celebrityId = $(event.target).closest(".celebrity-item").attr("data-celebid");
		let currentUserId = JSON.parse(localStorage.getItem("user")).id;
		let data = {
			celebrityId: celebrityId,
			userId: currentUserId
		};
		this.followService.unfollowCelebrity(data).subscribe(
			success => {
				this.celebrities.find(celeb => celeb._id === celebrityId).isFollowed = false;
			},
			error => {
				this.toastr.error(error.message);
			}
		)
	}

}
