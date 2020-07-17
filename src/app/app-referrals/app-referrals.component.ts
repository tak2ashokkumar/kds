import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppReferralsService, ApplicationCategory, VendorDescriptionData } from './app-referrals.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-referrals',
  templateUrl: './app-referrals.component.html',
  styleUrls: ['./app-referrals.component.scss'],
  providers: [AppReferralsService]
})
export class AppReferralsComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  appCategories: ApplicationCategory[] = [];

  selectedAppCategory: ApplicationCategory = new ApplicationCategory();
  selectedAppCategoryName: string = null;
  selectedAppName: string = null;

  categoryVendors: VendorDescriptionData[] = [];
  selectedVendor: VendorDescriptionData = new VendorDescriptionData();

  constructor(private referralsService: AppReferralsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.paramMap.forEach(param => {
      this.selectedAppCategoryName = param.get('appCategory');
      if (this.selectedAppCategoryName != this.router.url.split('/').pop()) {
        this.selectedAppName = this.router.url.split('/').pop();
      }
    })
  }

  ngOnInit() {
    this.getApplicationCategories();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getApplicationCategories() {
    this.appCategories = this.referralsService.getApplicationCategories();
    if (this.selectedAppCategoryName) {
      this.selectedAppCategory = this.appCategories.filter(category => category.name == this.selectedAppCategoryName).shift()
      if (this.selectedAppName) {
        this.router.navigate([this.selectedAppName], { relativeTo: this.route });
      } else {
        this.router.navigate([this.selectedAppCategory.defaultApp], { relativeTo: this.route });
      }
    } else {
      this.selectedAppCategory = this.appCategories[0];
      this.router.navigate([this.appCategories[0].defaultApp], { relativeTo: this.route });
    }
  }

  getRelatedVendors(view: ApplicationCategory) {
    this.selectedAppCategory = view;
    this.router.navigate([view.name, view.defaultApp], { relativeTo: this.route.parent });
  }

}
