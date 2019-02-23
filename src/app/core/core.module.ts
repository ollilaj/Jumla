import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoadingIconService} from "../loading-icon/loading-icon.service";

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [LoadingIconService]
})
export class CoreModule {

	static forRoot(): ModuleWithProviders {
		return {
			ngModule: CoreModule,
			providers: [
				LoadingIconService
			]
		};
	}
}
