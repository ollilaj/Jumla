import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { NavBarService } from '../../nav-bar/nav-bar.service';
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
				private router: Router,
				private navBarService : NavBarService) {}

	ngOnInit() {
		setTimeout(_ => {
			this.navBarService.hide();
		});
	}

	authenticate() : void {
		let data = {
			username: this.username,
			password: this.password
		};
		this.loginService.authenticate(data).subscribe(
			user => {
				localStorage.setItem("user", JSON.stringify(user.user));
				this.router.navigate(['all']);
			},
			error => {
				//toastr.error(error.message);
			}
		)
	}

}
