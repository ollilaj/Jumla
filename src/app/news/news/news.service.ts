import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NewsService {

	constructor(private http : HttpClient){}

	getFeeds() : Observable<any>{
		return this.http.get('/api/getRSSFeeds');
	}

	getCelebrities(userId) : Observable<any>{
		return this.http.get('/api/getCelebsTheyFollow/' + userId)
	}

}
