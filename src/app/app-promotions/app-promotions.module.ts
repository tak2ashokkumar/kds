import { NgModule } from '@angular/core';

import { AppPromotionsRoutingModule } from './app-promotions-routing.module';
import { AppPromotionsComponent } from './app-promotions.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { BillPaymentsComponent } from './bill-payments/bill-payments.component';
import { LoanProvidersComponent } from './loan-providers/loan-providers.component';
import { ReferralCodesComponent } from './referral-codes/referral-codes.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { AppCoreModuleModule } from '../app-core-module/app-core-module.module';


@NgModule({
  declarations: [
    AppHeaderComponent,
    AppPromotionsComponent,
    BillPaymentsComponent,
    LoanProvidersComponent,
    ReferralCodesComponent,
    UtilitiesComponent
  ],
  imports: [
    AppCoreModuleModule,
    AppPromotionsRoutingModule,
  ]
})
export class AppPromotionsModule { }
