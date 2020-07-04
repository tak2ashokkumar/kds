import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_REFERRALS_DATA } from './app-referrals-endpoint-const';

@Injectable()
export class AppReferralsService {

  constructor(private http: HttpClient) { }

  getApplicationCategories(): ApplicationCategory[] {
    return applicationCategories;
  }

  getCategoryVendors(selectedAppCategory: string): Observable<VendorDescriptionData[]> {
    return this.http.get<VendorDescriptionData[]>(GET_REFERRALS_DATA(selectedAppCategory));
  }
}

export class VendorDescriptionData {
  id: string;
  name: string;
  display_name: string;
  features: string[];
  description: string[];
  referral_code: string;
  referral_link: string;
  google_play_store_link: string;
  apple_app_store_link: string;
}

export class ApplicationCategory {
  displayName: string;
  name: string;
  defaultApp: string;
}

export const applicationCategories: ApplicationCategory[] = [
  {
    displayName: 'Bill Payments',
    name: 'bill_payments',
    defaultApp: 'cred',
  },
  {
    displayName: 'Banking & Loan Apps',
    name: 'banking',
    defaultApp: 'google_pay',
  },
  {
    displayName: 'Shopping Vendors',
    name: 'shopping_vendors',
    defaultApp: 'amazon',
  },
  {
    displayName: 'Utilities',
    name: 'utilities',
    defaultApp: 'truecaller',
  }
]
