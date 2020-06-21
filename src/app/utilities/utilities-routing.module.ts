import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilitiesComponent } from './utilities.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';


const routes: Routes = [
  {
    path: ':appName', component: UtilitiesComponent,
    children: [
      { path: 'calculateLovePercentage', component: LoveCalculatorComponent }
    ]
  },
  {
    path: '',
    redirectTo: 'love-calculator',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
