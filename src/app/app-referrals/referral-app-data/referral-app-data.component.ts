import { Component, OnInit } from '@angular/core';
import { VendorDescriptionData, AppReferralsService } from '../app-referrals.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'referral-app-data',
  templateUrl: './referral-app-data.component.html',
  styleUrls: ['./referral-app-data.component.scss'],

})
export class ReferralAppDataComponent implements OnInit {

  vendorCategory: string = '';
  categoryVendors: VendorDescriptionData[] = [];
  selectedVendor: VendorDescriptionData = new VendorDescriptionData();

  constructor(private referralsService: AppReferralsService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(param => {
      this.vendorCategory = param.appCategory
    });
  }

  ngOnInit(){
    this.getRelatedVendors();
  }

  getRelatedVendors() {
    this.categoryVendors = [];
    this.selectedVendor = new VendorDescriptionData();
    this.referralsService.getCategoryVendors(this.vendorCategory).subscribe((data: VendorDescriptionData[]) => {
      this.categoryVendors = data;
      this.selectedVendor = data[0];
    })
  }

  showVendorData(view: VendorDescriptionData) {
    this.selectedVendor = view;
  }

}
