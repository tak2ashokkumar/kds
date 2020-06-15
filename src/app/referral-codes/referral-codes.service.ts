import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_REFERRALS_DATA } from '../app-promotions/promotion-endpoints-const';

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
  vendors: number;
}

export const applicationCategories: ApplicationCategory[] = [
  {
    displayName: 'Bill Payments',
    name: 'bill_payments',
    vendors: 10,
  },
  {
    displayName: 'Loan Providers',
    name: 'loan_providers',
    vendors: 5,
  },
  {
    displayName: 'Banking Apps',
    name: 'banking',
    vendors: 2,
  },
  {
    displayName: 'Shopping Vendors',
    name: 'shopping_vendors',
    vendors: 6,
  },
  {
    displayName: 'Utilities',
    name: 'utilities',
    vendors: 4,
  }
]
