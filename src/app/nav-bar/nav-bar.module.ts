import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';

import { routing } from '../app.routes'

@NgModule({
	imports: [
		CommonModule,
		routing
	],
	declarations: [NavBarComponent],
	exports: [NavBarComponent]
})
export class NavBarModule {
}
