import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface TwitterResponse {
	data: any;
	resp: any;
}

@Injectable()
export class TwitterService {

	constructor(private http : HttpClient){}

	test(){
		return this.http.get<TwitterResponse>('/api/twitter/test');
	}

}
