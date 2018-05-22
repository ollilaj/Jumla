import { Component, Input } from '@angular/core';

@Component({
  selector: 'jumla-twitter-item',
  templateUrl: './twitter-item.component.html',
  styleUrls: ['./twitter-item.component.css']
})
export class TwitterItemComponent {

	@Input() tweet: any;

}
