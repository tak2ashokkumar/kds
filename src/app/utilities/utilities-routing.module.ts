import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilitiesComponent } from './utilities.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';
import { CovidTrackerComponent } from './covid-tracker/covid-tracker.component';


const routes: Routes = [
  {
    path: ':appName', component: UtilitiesComponent,
    children: [
      { path: 'calculateLovePercentage', component: LoveCalculatorComponent },
      { path: 'covid-tracker', component: CovidTrackerComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
