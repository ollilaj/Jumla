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

	public userId;
	public allCelebrities = [];
	public followedCelebrities = [];

	constructor(private followService : FollowService,
				private navBarService : NavBarService,
				private router: Router,
				private toastr: ToastrService) {
	}

	ngOnInit() {
		this.authenticate();
		this.followService.getCelebrities().subscribe(
			 celebs => {
				this.allCelebrities = JSON.parse(celebs.celebs);
				this.getFollowedCelebs();
			},
			errorResponse => {
			 	this.toastr.error(errorResponse.error.message);
			}
		)
	}

	ngAfterViewInit(){
		setTimeout(() => {this.navBarService.show()});
	}

	authenticate() : void {
		if(!localStorage.getItem("user")){
			this.router.navigate(['sign-in']);
		} else {
			this.userId = JSON.parse(localStorage.getItem("user")).userId;
		}
	}

	getFollowedCelebs() : void {
		this.followService.getCelebsTheyFollow(this.userId).subscribe(
			celebs => {
				this.followedCelebrities = JSON.parse(celebs.celebs);

				if(this.followedCelebrities && this.followedCelebrities.length > 0) {
					this.setFollowedCelebs(this.allCelebrities, this.followedCelebrities);
				} else {
					// They don't follow any celebs
				}
			},
			errorResponse => {
				this.toastr.error(errorResponse.error.message);
			}
		)
	}

	setFollowedCelebs(allCelebs, followedCelebs) : void {

		let currentCelebId, currentFollowedCelebId;
		for(let i = 0; i < allCelebs.length; i++) {
			currentCelebId = allCelebs[i].id;
			for(let j = 0; j < followedCelebs.length; j++) {
				currentFollowedCelebId = followedCelebs[j].id;

				if(currentCelebId == currentFollowedCelebId){
					allCelebs[i].isFollowed = true;
				}
			}
		}

	}

	follow(event) : void {
		let celebrityId = $(event.target).closest(".celebrity-item").attr("data-celebid");
		let data = {
			celebrityId: celebrityId,
			userId: this.userId
		};
		this.followService.followCelebrity(data).subscribe(
			success => {
				this.allCelebrities.find(celeb => celeb.id == celebrityId).isFollowed = true;
			},
			errorResponse => {
				this.toastr.error(errorResponse.error.message);
			}
		)
	}

	unfollow(event) : void {
		let celebrityId = $(event.target).closest(".celebrity-item").attr("data-celebid");
		let data = {
			celebrityId: celebrityId,
			userId: this.userId
		};
		this.followService.unfollowCelebrity(data).subscribe(
			success => {
				this.allCelebrities.find(celeb => celeb.id == celebrityId).isFollowed = false;
			},
			errorResponse => {
				this.toastr.error(errorResponse.error.message);
			}
		)
	}

}
