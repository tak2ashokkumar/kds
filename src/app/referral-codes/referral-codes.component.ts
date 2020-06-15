import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReferralCodesService, VendorDescriptionData, ApplicationCategory } from '../app-promotions/referral-codes/referral-codes.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'referral-codes',
  templateUrl: './referral-codes.component.html',
  styleUrls: ['./referral-codes.component.scss'],
  providers: [ReferralCodesService]
})
export class ReferralCodesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  appCategories: ApplicationCategory[] = [];
  selectedAppCategory: ApplicationCategory = new ApplicationCategory();

  categoryVendors: VendorDescriptionData[] = [];
  selectedVendor: VendorDescriptionData = new VendorDescriptionData();


  constructor(private referralCodesService: ReferralCodesService) { }

  ngOnInit(): void {
    this.getApplicationCategories();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getApplicationCategories() {
    this.appCategories = this.referralCodesService.getApplicationCategories();
    this.selectedAppCategory = this.appCategories[0];
    this.getRelatedVendors(this.selectedAppCategory);
  }

  getRelatedVendors(view: ApplicationCategory) {
    this.selectedAppCategory = view;
    this.categoryVendors = [];
    this.selectedVendor = new VendorDescriptionData();
    this.referralCodesService.getCategoryVendors(this.selectedAppCategory).subscribe((data: VendorDescriptionData[]) => {
      this.categoryVendors = data;
      this.selectedVendor = data[0];
    })
  }

  showVendorData(view: VendorDescriptionData) {
    this.selectedVendor = view;
  }

}
