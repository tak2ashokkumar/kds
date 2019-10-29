import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppMainComponent } from './app-main/app-main.component';
import { StaticPagesComponent } from './static-pages/static-pages.component';


const routes: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [
      { path: '', redirectTo: 'cred', pathMatch: 'full' },
      {
        path: 'cred', component: StaticPagesComponent
      },
      {
        path: 'true_balance', component: StaticPagesComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
