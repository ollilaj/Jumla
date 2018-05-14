import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstagramComponent } from './instagram/instagram.component';
import { InstagramItemComponent } from './instagram-item/instagram-item.component'

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [InstagramComponent, InstagramItemComponent],
	exports: [InstagramItemComponent]
})
export class InstagramModule {
}
