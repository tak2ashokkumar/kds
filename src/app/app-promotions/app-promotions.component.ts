import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-promotions',
  templateUrl: './app-promotions.component.html',
  styleUrls: ['./app-promotions.component.scss']
})
export class AppPromotionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('in app promotions');
  }

}
