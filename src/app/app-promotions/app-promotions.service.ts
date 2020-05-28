import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppPromotionsService {
  constructor(private http: HttpClient) { }

  getPromotionTypes(): PromotionType[] {
    return promotionTypes;
  }
}
export class PromotionType {
  displayName: string;
  name: string;
  vendors: number;
}

export const promotionTypes: PromotionType[] = [
  {
    displayName: 'Bill Payments',
    name: 'bill_payments',
    vendors: 20
  },
  {
    displayName: 'Activity Trackers',
    name: 'activity_trackers',
    vendors: 2
  },
  {
    displayName: 'Loan Providers',
    name: 'loan_providers',
    vendors: 4
  },
  {
    displayName: 'Shopping Vendors',
    name: 'shopping_vendors',
    vendors: 6
  },
  {
    displayName: 'Utilities',
    name: 'utilities',
    vendors: 8
  }
]
