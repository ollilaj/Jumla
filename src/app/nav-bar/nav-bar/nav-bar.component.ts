import { Component, OnInit } from '@angular/core';
import { NavBarService } from '../../nav-bar/nav-bar.service';

@Component({
	selector: 'app-nav-bar',
	templateUrl: './nav-bar.component.html',
	styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

	constructor(private nav : NavBarService) {
	}

	ngOnInit() {

	}

}
