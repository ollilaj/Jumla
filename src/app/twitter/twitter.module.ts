import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TwitterComponent } from './twitter/twitter.component';
import { TwitterItemComponent } from './twitter-item/twitter-item.component';

@NgModule({
	imports: [
		CommonModule,
		HttpClientModule
	],
	declarations: [TwitterComponent, TwitterItemComponent],
	exports: [TwitterItemComponent]
})
export class TwitterModule {
}
