import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginService {

	constructor(private http : HttpClient){}

	register(data) : Observable<any>{
		return this.http.post('/api/register', data);
	}

	authenticate(data) : Observable<any>{
		return this.http.post('/api/authenticate', data);
	}

	checkUsername(username): Observable<any> {
		return this.http.get('/api/checkForUserName/' + username);
	}

}
