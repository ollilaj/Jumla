import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

	public username;
	public password;
	public confirmPassword;

	constructor(private loginService : LoginService,
				private router: Router,
				private toastr: ToastrService) {}

	ngOnInit() {
	}

	validateInput() : void {
		if(this.username.length < 6 || this.username.length > 16){
			this.toastr.error("Username must be at least 6 characters long and no longer than 16.");
			return;
		} else if(this.password != this.confirmPassword) {
			this.toastr.error("Password doesn't match Confirmed Password.");
			return;
		} else if(!this.password || this.password.length < 6 || this.password.length > 16) {
			this.toastr.error("Password must be at least 6 characters long and no longer than 16.");
			return;
		} else {
			this.loginService.checkUsername(this.username).subscribe(
				exists => {
					this.registerNewUser();
				},
				errorResponse => {
					this.toastr.error(errorResponse.error.message);
				}
			);
		}
	}

	registerNewUser() : void {
		let data = {
			username: this.username,
			password: this.password,
			confirmPassword: this.confirmPassword
		};

		this.loginService.register(data).subscribe(
			user => {
					localStorage.setItem("user", JSON.stringify(user.user));
					this.router.navigate(['all']);
			},
			errorResponse => {
				this.toastr.error(errorResponse.error.message);
			}
		)
	}

}
