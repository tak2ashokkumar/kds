import { NgModule } from '@angular/core';
import { AppCoreModule } from '../app-core/app-core.module';
import { AppReferralsRoutingModule } from './app-referrals-routing.module';

import { AppReferralsComponent } from './app-referrals.component';
import { ReferralAppDataComponent } from './referral-app-data/referral-app-data.component';


@NgModule({
  declarations: [
    AppReferralsComponent,
    ReferralAppDataComponent
  ],
  imports: [
    AppCoreModule,
    AppReferralsRoutingModule
  ]
})
export class AppReferralsModule { }
