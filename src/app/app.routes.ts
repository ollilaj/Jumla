import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all/all.component';
import { InstagramComponent } from './instagram/instagram/instagram.component';
import { TwitterComponent } from './twitter/twitter/twitter.component';
import { NewsComponent } from './news/news/news.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { FollowComponent } from './follow/follow/follow.component';

export const routing:Routes = [
	{path: '', redirectTo: 'sign-in', pathMatch: 'full'},
	{path: 'sign-in', component: SignInComponent},
	{path: 'sign-up', component: SignUpComponent},
	{path: 'all', component: AllComponent},
	{path: 'instagram', component: InstagramComponent},
	{path: 'twitter', component: TwitterComponent},
	{path: 'news', component: NewsComponent},
	{path: 'follow', component: FollowComponent}
];
