import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppPromotionsService, PromotionType, promotionTypes } from './app-promotions.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-promotions',
  templateUrl: './app-promotions.component.html',
  styleUrls: ['./app-promotions.component.scss'],
  providers: [AppPromotionsService]
})
export class AppPromotionsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  promotionsTypes: PromotionType[] = promotionTypes;

  constructor(private promotionsService: AppPromotionsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() { }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getRelatedReferrals(view: PromotionType) {
    this.router.navigate([view.name], { relativeTo: this.route })
  }

}
