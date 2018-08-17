import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstagramComponent } from './instagram/instagram.component';
import { InstagramItemComponent } from './instagram-item/instagram-item.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
	imports: [
		CommonModule,
		NavBarModule
	],
	declarations: [InstagramComponent, InstagramItemComponent],
	exports: [InstagramItemComponent]
})
export class InstagramModule {
}
