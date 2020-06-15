import { NgModule } from '@angular/core';

import { AppPromotionsRoutingModule } from './app-promotions-routing.module';
import { AppPromotionsComponent } from './app-promotions.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { ReferralCodesComponent } from './referral-codes/referral-codes.component';
import { AppCoreModule } from '../app-core/app-core.module';


@NgModule({
  declarations: [
    // AppHeaderComponent,
    AppPromotionsComponent,
    ReferralCodesComponent
  ],
  imports: [
    AppCoreModule,
    AppPromotionsRoutingModule
  ]
})
export class AppPromotionsModule { }
