import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CredComponent } from './cred/cred.component';
import { TrueBalanceComponent } from './true-balance/true-balance.component';
import { AppPromotionsComponent } from './app-promotions.component';


const routes: Routes = [
  { 
    path: '', 
    component: AppPromotionsComponent,
    children:[
      { path: 'cred', component: CredComponent },
      { path: 'true_balance', component: TrueBalanceComponent },
      { path: '', redirectTo: 'cred', pathMatch: 'full' },
    ] 
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPromotionsRoutingModule { }
