import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';

const routes: Routes = [
  { path: 'home', component: AppMainComponent },
  {
    path: 'user',
    loadChildren: () => import(`./user-management/user-management.module`).then(m => m.UserManagementModule)
  },
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
    redirectTo: 'user/login', pathMatch: 'full'
  },
  {
    path: '404',
    component: InvalidRouteComponent,
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }