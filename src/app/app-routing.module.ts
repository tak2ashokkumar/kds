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
    path: 'referral-codes',
    loadChildren: () => import('./app-referrals/app-referrals.module').then(m => m.AppReferralsModule)
  },
  {
    path: '',
    redirectTo: 'referral-codes',
    pathMatch: 'full'
  },
  {
    path: '404',
    component: InvalidRouteComponent,
  },
  // { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }