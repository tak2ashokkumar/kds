import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppPromotionsService {
  constructor(private http: HttpClient) { }

  getPromotionTypes(): PromotionType[] {
    return promotionTypes;
  }


}

export class AppDescriptionData {
  name: string;
  displayName: string;
  features: string[];
  description: string[];
  play_store_download_link: string;
  app_store_download_link: string;
}
export class PromotionType {
  displayName: string;
  name: string;
  vendors: number;
  isSelected: boolean;
}

export const promotionTypes: PromotionType[] = [
  {
    displayName: 'Bill Payments',
    name: 'bill_payments',
    vendors: 20,
    isSelected: false
  },
  {
    displayName: 'Activity Trackers',
    name: 'activity_trackers',
    vendors: 2,
    isSelected: false
  },
  {
    displayName: 'Loan Providers',
    name: 'loan_providers',
    vendors: 4,
    isSelected: false
  },
  {
    displayName: 'Shopping Vendors',
    name: 'shopping_vendors',
    vendors: 6,
    isSelected: false
  },
  {
    displayName: 'Utilities',
    name: 'utilities',
    vendors: 8,
    isSelected: false
  }
]
