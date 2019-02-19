import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingIconComponent} from "./loading-icon/loading-icon.component";
import {LoadingIconService} from "./loading-icon.service";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [LoadingIconComponent],
	exports: [LoadingIconComponent],
	providers: [LoadingIconService]
})
export class LoadingIconModule {
}
