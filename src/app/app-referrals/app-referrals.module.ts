import { NgModule } from '@angular/core';
import { AppCoreModule } from '../app-core/app-core.module';
import { AppReferralsRoutingModule } from './app-referrals-routing.module';

import { AppHeaderComponent } from '../app-header/app-header.component';
import { AppReferralsComponent } from './app-referrals.component';
import { ReferralAppDataComponent } from './referral-app-data/referral-app-data.component';


@NgModule({
  declarations: [
    AppHeaderComponent,
    AppReferralsComponent,
    ReferralAppDataComponent
  ],
  imports: [
    AppCoreModule,
    AppReferralsRoutingModule
  ]
})
export class AppReferralsModule { }
