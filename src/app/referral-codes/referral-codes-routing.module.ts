import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReferralCodesComponent } from './referral-codes.component';


const routes: Routes = [
  {
    path: '', component: ReferralCodesComponent
    // children: [
    //   { path: 'shopping_vendors', component: ReferralCodesComponent },
    //   { path: 'referrals', component: ReferralCodesComponent },
    //   { path: '', redirectTo: 'referrals', pathMatch: 'full' },
    // ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralCodesRoutingModule { }
