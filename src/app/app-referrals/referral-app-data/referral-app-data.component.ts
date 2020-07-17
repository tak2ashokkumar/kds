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
    this.route.paramMap.subscribe(param => {
      this.vendorName = param.get('app');
    })
    this.route.parent.paramMap.subscribe(param => {
      this.vendorCategory = param.get('appCategory');
      this.getRelatedVendors();
    })
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getRelatedVendors() {
    this.categoryVendors = [];
    this.selectedVendor = new VendorDescriptionData();
    this.referralsService.getCategoryVendors(this.vendorCategory).pipe(takeUntil(this.ngUnsubscribe)).subscribe((data: VendorDescriptionData[]) => {
      this.categoryVendors = data;
      this.selectedVendor = data.filter(vendor => vendor.name == this.vendorName).shift();
    })
  }

  showVendorData(view: VendorDescriptionData) {
    this.selectedVendor = view;
    this.router.navigate([this.selectedVendor.name], { relativeTo: this.route.parent });
  }

}
