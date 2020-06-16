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

  categoryVendors: VendorDescriptionData[] = [];
  selectedVendor: VendorDescriptionData = new VendorDescriptionData();

  constructor(private referralsService: AppReferralsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.getApplicationCategories();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getApplicationCategories() {
    this.appCategories = this.referralsService.getApplicationCategories();
    this.getRelatedVendors(this.appCategories[0]);
  }

  getRelatedVendors(view: ApplicationCategory) {
    this.selectedAppCategory = view;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>{
      this.router.navigate([view.name], { relativeTo: this.route });
    });
  }

  showVendorData(view: VendorDescriptionData) {
    this.selectedVendor = view;
  }

}
