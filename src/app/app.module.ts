import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AllModule } from './all/all.module';
import { InstagramModule } from './instagram/instagram.module';
import { TwitterModule } from './twitter/twitter.module';
import { NewsModule } from './news/news.module';

import { routing } from './app.routes';

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		routing,
		AllModule,
		InstagramModule,
		TwitterModule,
		NewsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
