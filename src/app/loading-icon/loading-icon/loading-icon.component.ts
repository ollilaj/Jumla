import {Component, OnInit, OnDestroy, ChangeDetectorRef} from '@angular/core';
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

	constructor(private loadingIconService: LoadingIconService,
				private cdRef : ChangeDetectorRef) {}

	ngOnInit() {
		this.loadingSubscription = this.loadingIconService.loadingStatus.subscribe((value) => {
			this.loading = value;
			this.cdRef.detectChanges();
		});
	}

	ngOnDestroy() {
		this.loadingSubscription.unsubscribe();
	}

}
