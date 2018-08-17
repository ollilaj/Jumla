import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sign-in',
	templateUrl: './sign-in.component.html',
	styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

	public username;
	public password;

	constructor(private loginService : LoginService,
				private router: Router) {}

	ngOnInit() {
	}

	authenticate() : void {
		var data = {
			username: this.username,
			password: this.password
		};
		this.loginService.authenticate(data).subscribe(
			(response : any) => {
				if(response.success) {
					localStorage.setItem("user", response.user);
					this.router.navigate(['all']);
				} else {
					alert("Error: " + response.msg);
				}
			}
		)
	}

}
