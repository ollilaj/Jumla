import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

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
				private router: Router) {}

	ngOnInit() {
	}

	validateInput() : void {
		if(this.username.length < 6 || this.username.length > 16){
			alert("Error: Username must be at least 6 characters long and no longer than 16.");
			return;
		} else if(this.password != this.confirmPassword) {
			alert("Password doesn't match Confirmed Password.");
			return;
		} else if(this.password.length < 6 || this.password.length > 16) {
			alert("Error: Password must be at least 6 characters long and no longer than 16.");
			return;
		} else {
			this.loginService.checkUsername(this.username).subscribe(
				(data: any) => {
					if (data.exists === true) {
						alert('This username already exists please try something else');
						return;
					} else {
						this.registerNewUser();
					}
				}
			);
		}
	}

	registerNewUser() : void {
		var data = {
			username: this.username,
			password: this.password,
			confirmPassword: this.confirmPassword
		};

		this.loginService.register(data).subscribe(
			(response : any) => {
				if(response.success){
					localStorage.setItem("user", JSON.stringify(response.user));
					this.router.navigate(['all']);
				} else {
					alert("Could Not Sign Up.");
				}
			}
		)
	}

}
