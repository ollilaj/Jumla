import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TwitterModule } from '../../twitter/twitter.module';
import { NewsModule } from '../../news/news.module';
import { NavBarService } from '../../nav-bar/nav-bar.service';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit, AfterViewInit {

	constructor(private navBarService : NavBarService) {}

	ngOnInit() {

	}

	ngAfterViewInit(){
		setTimeout(() => {this.navBarService.show()});
	}

	sortAll() {

	}

}
