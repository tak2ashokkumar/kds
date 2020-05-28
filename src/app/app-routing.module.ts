import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';


const routes: Routes = [
  { 
    path: 'default', 
    component: AppMainComponent
  },
  { 
    path: 'promotions', 
    loadChildren: () => import(`./app-promotions/app-promotions.module`).then(m => m.AppPromotionsModule) 
  },
  { 
    path: '', 
    redirectTo: 'promotions', 
    pathMatch: 'full' 
  },
  // { 
  //   path: '', 
  //   component: InvalidRouteComponent, 
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }