import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export interface TwitterResponse {
	data: any;
	resp: any;
}

@Injectable()
export class TwitterService {

	constructor(private http : HttpClient){}

	getTweets(user) : Observable<any>{
		return this.http.get<TwitterResponse>('/api/twitter/' + user);
	}

}
