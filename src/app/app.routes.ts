import { RouterModule, Routes } from '@angular/router';
import { AllComponent } from './all/all/all.component';
import { InstagramComponent } from './instagram/instagram/instagram.component';
import { TwitterComponent } from './twitter/twitter/twitter.component';
import { NewsComponent } from './news/news/news.component';

const routes:Routes = [
	{path: '', redirectTo: 'all', pathMatch: 'full'},
	{path: 'all', component: AllComponent},
	{path: 'instagram', component: InstagramComponent},
	{path: 'twitter', component: TwitterComponent},
	{path: 'news', component: NewsComponent}
];

export const routing = RouterModule.forRoot(routes);

