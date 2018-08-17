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

	register() : void {
		var data = {
			username: this.username,
			password: this.password,
			confirmPassword: this.confirmPassword
		};

		var validInput = this.validateInput();

		if(validInput) {
			this.loginService.register(data).subscribe(
				(response : any) => {
					if(response.success){
						localStorage.setItem("user", response.user);
						this.router.navigate(['all']);
					} else {
						alert("Could Not Sign Up");
					}
				}
			)
		}
	}

	validateInput() : boolean {
		return true;
	}

}
