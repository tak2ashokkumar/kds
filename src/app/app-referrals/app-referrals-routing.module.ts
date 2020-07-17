import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppReferralsComponent } from './app-referrals.component';
import { ReferralAppDataComponent } from './referral-app-data/referral-app-data.component'


const routes: Routes = [
  {
    path: ':appCategory', component: AppReferralsComponent,
    children: [
      { path: ':app', component: ReferralAppDataComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppReferralsRoutingModule { }
