import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPromotionsComponent } from './app-promotions.component';
import { BillPaymentsComponent } from './bill-payments/bill-payments.component';
import { LoanProvidersComponent } from './loan-providers/loan-providers.component';
import { UtilitiesComponent } from './utilities/utilities.component';
import { ReferralCodesComponent } from './referral-codes/referral-codes.component';


const routes: Routes = [
  { 
    path: '', component: AppPromotionsComponent,
    children:[
      { path: 'bill_payments', component: BillPaymentsComponent },
      { path: 'loan_providers', component: LoanProvidersComponent },
      { path: 'shopping_vendors', component: ReferralCodesComponent },
      { path: 'referrals', component: ReferralCodesComponent },
      { path: 'utilities', component: UtilitiesComponent },
      { path: '', redirectTo: 'referrals', pathMatch: 'full' },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPromotionsRoutingModule { }
