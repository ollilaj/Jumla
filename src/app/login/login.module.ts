import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './login.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { routing } from '../app.routes';

@NgModule({
	imports: [
		CommonModule,
		routing,
		FormsModule,
		ReactiveFormsModule
	],
	declarations: [SignInComponent, SignUpComponent],
	providers: [LoginService]
})
export class LoginModule {
}
