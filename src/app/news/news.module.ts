import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { NewsItemComponent } from './news-item/news-item.component';
import { NavBarModule } from '../nav-bar/nav-bar.module';
import { LoadingIconModule } from "../loading-icon/loading-icon.module";

@NgModule({
	imports: [
		CommonModule,
		NavBarModule,
		LoadingIconModule
	],
	declarations: [NewsComponent, NewsItemComponent],
	exports: [NewsItemComponent, NewsComponent]
})
export class NewsModule {
}
