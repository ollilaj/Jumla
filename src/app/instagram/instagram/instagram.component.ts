import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarService } from '../../nav-bar/nav-bar.service';

@Component({
	selector: 'jumla-instagram',
	templateUrl: './instagram.component.html',
	styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit, AfterViewInit{

	posts: any[] = [];

	constructor(private navBarService : NavBarService,
				private router: Router){}

	ngOnInit(){
		this.authenticate();
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

}
