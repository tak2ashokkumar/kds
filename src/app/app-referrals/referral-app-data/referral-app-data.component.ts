import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { VendorDescriptionData, AppReferralsService } from '../app-referrals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'referral-app-data',
  templateUrl: './referral-app-data.component.html',
  styleUrls: ['./referral-app-data.component.scss'],

})
export class ReferralAppDataComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  vendorCategory: string = '';
  vendorName: string = '';
  categoryVendors: VendorDescriptionData[] = [];
  selectedVendor: VendorDescriptionData = new VendorDescriptionData();

  constructor(private referralsService: AppReferralsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(param => {
      this.vendorCategory = param.appCategory;
      this.vendorName = param.app;
    });
  }

  ngOnInit() {
    this.getRelatedVendors();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getRelatedVendors() {
    this.categoryVendors = [];
    this.selectedVendor = new VendorDescriptionData();
    this.referralsService.getCategoryVendors(this.vendorCategory).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: VendorDescriptionData[]) => {
      this.categoryVendors = data;
      data.map((vendor, index) => {
        if (vendor.name == this.vendorName) {
          this.selectedVendor = data[index];
        }
      })
    })
  }

  showVendorData(view: VendorDescriptionData) {
    this.selectedVendor = view;
    this.router.navigate([this.vendorCategory, this.selectedVendor.name], { relativeTo: this.route.parent })
  }

}
