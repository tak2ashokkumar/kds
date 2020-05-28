import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredComponent } from './cred/cred.component';
import { TrueBalanceComponent } from './true-balance/true-balance.component';
import { AppPromotionsComponent } from './app-promotions.component';
import { BillPaymentsComponent } from './bill-payments/bill-payments.component';
import { ActivityTrackersComponent } from './activity-trackers/activity-trackers.component';
import { LoanProvidersComponent } from './loan-providers/loan-providers.component';
import { ShoppingVendorsComponent } from './shopping-vendors/shopping-vendors.component';
import { UtilitiesComponent } from './utilities/utilities.component';


const routes: Routes = [
  { 
    path: '', component: AppPromotionsComponent,
    children:[
      { path: 'bill_payments', component: BillPaymentsComponent },
      { path: 'activity_trackers', component: ActivityTrackersComponent },
      { path: 'loan_providers', component: LoanProvidersComponent },
      { path: 'shopping_vendors', component: ShoppingVendorsComponent },
      { path: 'utilities', component: UtilitiesComponent },
      { path: 'cred', component: CredComponent },
      { path: 'true_balance', component: TrueBalanceComponent },
      { path: '', redirectTo: 'bill_payments', pathMatch: 'full' },
    ] 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPromotionsRoutingModule { }
