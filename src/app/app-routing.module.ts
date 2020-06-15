import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';


const routes: Routes = [
  { path: 'default', component: AppMainComponent },
  {
    path: 'promotions',
    loadChildren: () => import(`./app-promotions/app-promotions.module`).then(m => m.AppPromotionsModule)
  },
  {
    path: 'referrals',
    loadChildren: () => import('./referral-codes/referral-codes.module').then(m => m.ReferralCodesModule)
  },
  // {
  //   path: '',
  //   redirectTo: 'promotions',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: 'referrals',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: InvalidRouteComponent,
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }