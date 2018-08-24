import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AllModule } from './all/all.module';
import { InstagramModule } from './instagram/instagram.module';
import { TwitterModule } from './twitter/twitter.module';
import { NewsModule } from './news/news.module';
import { LoginModule } from './login/login.module';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { FollowModule } from './follow/follow.module';

import { routing } from './app.routes';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routing),
		AllModule,
		InstagramModule,
		TwitterModule,
		NewsModule,
		LoginModule,
		NavBarModule,
		FollowModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {
}
