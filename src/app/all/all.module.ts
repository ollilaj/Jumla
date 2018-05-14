import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllComponent } from './all/all.component';
import { InstagramModule } from '../instagram/instagram.module';
import { TwitterModule } from '../twitter/twitter.module';
import { NewsModule } from '../news/news.module';

@NgModule({
	imports: [
		CommonModule,
		InstagramModule,
		TwitterModule,
		NewsModule
	],
	declarations: [AllComponent]
})
export class AllModule {
}
