import { NgModule } from '@angular/core';

import { AppPromotionsRoutingModule } from './app-promotions-routing.module';
import { AppPromotionsComponent } from './app-promotions.component';
import { CredComponent } from './cred/cred.component';
import { TrueBalanceComponent } from './true-balance/true-balance.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { BillPaymentsComponent } from './bill-payments/bill-payments.component';
import { ActivityTrackersComponent } from './activity-trackers/activity-trackers.component';
import { LoanProvidersComponent } from './loan-providers/loan-providers.component';
import { ShoppingVendorsComponent } from './shopping-vendors/shopping-vendors.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { AppCoreModuleModule } from '../app-core-module/app-core-module.module';


@NgModule({
  declarations: [
    AppHeaderComponent,
    AppPromotionsComponent, 
    CredComponent, 
    TrueBalanceComponent, BillPaymentsComponent, ActivityTrackersComponent, LoanProvidersComponent, ShoppingVendorsComponent, UtilitiesComponent
  ],
  imports: [
    AppCoreModuleModule,
    AppPromotionsRoutingModule,
  ]
})
export class AppPromotionsModule { }
