import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FollowService {

	constructor(private http : HttpClient){}

	getCelebrities() : Observable<any>{
		return this.http.get('/api/getAllCelebrities');
	}

	getCelebsTheyFollow(userId) : Observable<any>{
		return this.http.get('/api/getCelebsTheyFollow/' + userId);
	}

	followCelebrity(data) : Observable<any>{
		return this.http.post('/api/follow', data)
	}

	unfollowCelebrity(data) : Observable<any>{
		return this.http.post('/api/unfollow', data)
	}

}
