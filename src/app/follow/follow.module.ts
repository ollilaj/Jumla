import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FollowComponent } from './follow/follow.component';
import { FollowService } from './follow.service';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
	imports: [
		CommonModule,
		NavBarModule
	],
	declarations: [FollowComponent],
	providers: [FollowService]
})
export class FollowModule {
}
