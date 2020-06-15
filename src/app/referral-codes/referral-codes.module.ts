import { NgModule } from '@angular/core';

import { ReferralCodesRoutingModule } from './referral-codes-routing.module';
import { ReferralCodesComponent } from './referral-codes.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { AppCoreModule } from '../app-core/app-core.module';


@NgModule({
  declarations: [
    AppHeaderComponent,
    ReferralCodesComponent
  ],
  imports: [
    AppCoreModule,
    ReferralCodesRoutingModule
  ]
})
export class ReferralCodesModule { }
