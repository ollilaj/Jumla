import {Component, OnInit, OnDestroy} from '@angular/core';
import {LoadingIconService} from "../loading-icon.service";
import {Subscription} from "rxjs";

@Component({
	selector: 'app-loading-icon',
	templateUrl: './loading-icon.component.html',
	styleUrls: ['./loading-icon.component.css']
})
export class LoadingIconComponent implements OnInit, OnDestroy {

	loading: boolean = false;
	loadingSubscription: Subscription;

	constructor(private loadingIconService: LoadingIconService) {}

	ngOnInit() {
		this.loadingSubscription = this.loadingIconService.loadingStatus.subscribe((value) => {
			this.loading = value;
		});
	}

	ngOnDestroy() {
		this.loadingSubscription.unsubscribe();
	}

}
