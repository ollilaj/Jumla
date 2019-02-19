import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class TwitterService {

	constructor(private http : HttpClient){}

	getTweets(userId) : Observable<any>{
		return this.http.get('/api/getTweets/' + userId);
	}

}
