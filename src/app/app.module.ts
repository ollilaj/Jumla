import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module'
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AllModule } from './all/all.module';
import { InstagramModule } from './instagram/instagram.module';
import { TwitterModule } from './twitter/twitter.module';
import { NewsModule } from './news/news.module';
import { LoginModule } from './login/login.module';
import { NavBarModule } from './nav-bar/nav-bar.module';
import { FollowModule } from './follow/follow.module';
import { LoadingIconModule } from "./loading-icon/loading-icon.module";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routing } from './app.routes';

import { NewsService } from "./news/news/news.service";

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
		FollowModule,
		ToastrModule.forRoot(),
		BrowserAnimationsModule,
		LoadingIconModule,
		CoreModule.forRoot()
	],
	providers: [NewsService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
