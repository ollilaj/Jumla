import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all/all.component';
import { InstagramComponent } from './instagram/instagram/instagram.component';
import { TwitterComponent } from './twitter/twitter/twitter.component';
import { NewsComponent } from './news/news/news.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';

const routes:Routes = [
	{path: '', redirectTo: 'sign-in', pathMatch: 'full'},
	{path: 'sign-in', component: SignInComponent},
	{path: 'sign-up', component: SignUpComponent},
	{path: 'all', component: AllComponent},
	{path: 'instagram', component: InstagramComponent},
	{path: 'twitter', component: TwitterComponent},
	{path: 'news', component: NewsComponent}
];

export const routing = RouterModule.forRoot(routes);

