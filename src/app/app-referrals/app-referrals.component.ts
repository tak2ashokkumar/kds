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
    this.selectedAppCategoryName = this.router.url.split('/').slice(-2)[0];
    this.selectedAppName = this.router.url.split('/').slice(-2)[1];
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
      for (var i = 0; i < this.appCategories.length; i++) {
        if (this.appCategories[i].name == this.selectedAppCategoryName) {
          this.selectedAppCategory = this.appCategories[i];
        }
      }
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.selectedAppCategoryName, this.selectedAppName], { relativeTo: this.route });
      });
    } else {
      this.selectedAppCategory = this.appCategories[0];
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.appCategories[0].name, this.appCategories[0].defaultApp], { relativeTo: this.route });
      });
    }
  }

  getRelatedVendors(view: ApplicationCategory) {
    this.selectedAppCategory = view;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([view.name, view.defaultApp], { relativeTo: this.route });
    });
  }

  showVendorData(view: VendorDescriptionData) {
    this.selectedVendor = view;
  }

}
