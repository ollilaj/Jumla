import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class TwitterService {

	constructor(private http : HttpClient){}

	getTweets(users) : Observable<any>{
		var getRequests = [];
		var getUrlBeginning = '/api/getTweets/';
		for(let user of users) {
			getRequests.push(this.http.get(getUrlBeginning + user.twitterId));
		}
		return Observable.forkJoin(getRequests);
	}

	getCelebsTheyFollow(userId) : Observable<any>{
		return this.http.get('/api/getCelebsTheyFollow/' + userId);
	}

}
