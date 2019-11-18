import { Component, OnInit } from '@angular/core';
import { AppPromotionsService } from './app-promotions.service';

@Component({
  selector: 'app-app-promotions',
  templateUrl: './app-promotions.component.html',
  styleUrls: ['./app-promotions.component.scss'],
  providers: [AppPromotionsService]
})
export class AppPromotionsComponent implements OnInit {

  constructor(private promotionsService: AppPromotionsService) { }

  ngOnInit() {
    console.log('in app promotions');
  }

  getLiveScores() {
    // this.promotionsService.
  }

}
