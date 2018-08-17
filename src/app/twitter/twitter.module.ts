import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TwitterComponent } from './twitter/twitter.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule,
		NavBarModule
	],
	declarations: [TwitterComponent],
	exports: [TwitterComponent]
})
export class TwitterModule {
}
