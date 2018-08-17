import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { InstagramModule } from '../instagram/instagram.module';
import { TwitterModule } from '../twitter/twitter.module';
import { NewsModule } from '../news/news.module';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
	imports: [
		CommonModule,
		InstagramModule,
		TwitterModule,
		NewsModule,
		NavBarModule
	],
	declarations: [AllComponent]
})
export class AllModule {
}
