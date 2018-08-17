import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';

@NgModule({
	imports: [
		CommonModule,
		NavBarModule
	],
	declarations: [NewsComponent, NewsItemComponent],
	exports: [NewsItemComponent]
})
export class NewsModule {
}
