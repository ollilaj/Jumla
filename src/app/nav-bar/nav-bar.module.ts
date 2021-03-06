import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { routing } from '../app.routes'

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routing)
	],
	declarations: [NavBarComponent],
	exports: [NavBarComponent],
	providers: []
})
export class NavBarModule {
}
