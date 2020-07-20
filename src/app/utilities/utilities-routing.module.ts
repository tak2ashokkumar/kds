import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilitiesComponent } from './utilities.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';
import { CovidTrackerComponent } from './covid-tracker/covid-tracker.component';
import { HtmlToPdfConverterComponent } from './html-to-pdf-converter/html-to-pdf-converter.component';


const routes: Routes = [
  {
    path: ':appName', component: UtilitiesComponent,
    children: [
      { path: 'pdf-generator', component: HtmlToPdfConverterComponent },
      { path: 'covid-tracker', component: CovidTrackerComponent },
      { path: 'calculateLovePercentage', component: LoveCalculatorComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilitiesRoutingModule { }
