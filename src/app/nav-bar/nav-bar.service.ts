import { Injectable } from '@angular/core';

@Injectable()
export class NavBarService {

	public isVisible : boolean = false;

	constructor(){}

	show() : void {
		this.isVisible = true;
	}

	hide() : void {
		this.isVisible = false;
	}

}
