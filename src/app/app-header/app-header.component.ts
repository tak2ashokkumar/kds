import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Subject } from 'rxjs';
import { AppHeaderService, QuoteDetailsViewData } from './app-header.service';
import { takeUntil, filter } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  providers: [AppHeaderService, { provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class AppHeaderComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  quote: QuoteDetailsViewData = new QuoteDetailsViewData();
  activeModule: string = null;
  constructor(private headerService: AppHeaderService,
    private router: Router,
    private route: ActivatedRoute) {
    router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.activeModule = val.url.split('/')[1]
      }
    })
  }

  ngOnInit() {
    this.getTodaysQuote();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getTodaysQuote() {
    this.headerService.getTodaysQuote().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.quote = this.headerService.convertToViewData(data);
    }, (err: HttpErrorResponse) => {
      console.log('err : ', err);
    })
  }

  goToReferrals() {
    this.router.navigate(['/referral-codes/bill_payments'], { relativeTo: this.route.firstChild.parent });
  }

  goToUtilities() {
    this.router.navigate(['/utils/love-calculator'], { relativeTo: this.route.firstChild.parent });
  }

}
