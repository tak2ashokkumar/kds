import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GET_REFERRALS_DATA } from '../promotion-endpoints-const';
import { Observable } from 'rxjs';

@Injectable()
export class ReferralCodesService {

  constructor(private http: HttpClient) { }

  getApplicationCategories(): ApplicationCategory[] {
    return applicationCategories;
  }

  getCategoryVendors(selectedAppCategory: ApplicationCategory): Observable<VendorDescriptionData[]> {
    return this.http.get<VendorDescriptionData[]>(GET_REFERRALS_DATA(selectedAppCategory.name));
  }

}

export class VendorDescriptionData {
  name: string;
  displayName: string;
  features: string[];
  description: string[];
  referral_code: string;
  referral_link: string;
  play_store_download_link: string;
  app_store_download_link: string;
}

export class ApplicationCategory {
  displayName: string;
  name: string;
  vendors: number;
}

export const applicationCategories: ApplicationCategory[] = [
  {
    displayName: 'Bill Payments',
    name: 'bill_payments',
    vendors: 20,
  },
  // {
  //   displayName: 'Activity Trackers',
  //   name: 'activity_trackers',
  //   vendors: 2,
  // },
  {
    displayName: 'Shopping Vendors',
    name: 'shopping_vendors',
    vendors: 6,
  },
  {
    displayName: 'Loan Providers',
    name: 'loan_providers',
    vendors: 4,
  },
  {
    displayName: 'Utilities',
    name: 'utilities',
    vendors: 8,
  }
]