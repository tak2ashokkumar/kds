import { NgModule } from '@angular/core';

import { AppPromotionsRoutingModule } from './app-promotions-routing.module';
import { AppPromotionsComponent } from './app-promotions.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { ReferralCodesComponent } from './referral-codes/referral-codes.component';
import { AppCoreModuleModule } from '../app-core-module/app-core-module.module';


@NgModule({
  declarations: [
    AppHeaderComponent,
    AppPromotionsComponent,
    ReferralCodesComponent,
  ],
  imports: [
    AppCoreModuleModule,
    AppPromotionsRoutingModule,
  ]
})
export class AppPromotionsModule { }
