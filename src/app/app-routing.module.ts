import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';


const routes: Routes = [
  { path: 'default', component: AppMainComponent },
  {
    path: 'utils',
    loadChildren: () => import(`./utilities/utilities.module`).then(m => m.UtilitiesModule)
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