import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppPromotionsComponent } from './app-promotions.component';


const routes: Routes = [
  {
    path: '', component: AppPromotionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppPromotionsRoutingModule { }
