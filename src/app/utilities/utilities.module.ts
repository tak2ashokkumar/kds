import { NgModule } from '@angular/core';
import { AppCoreModule } from '../app-core/app-core.module';
import { UtilitiesRoutingModule } from './utilities-routing.module';

import { UtilitiesComponent } from './utilities.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';
import { CovidTrackerComponent } from './covid-tracker/covid-tracker.component';


@NgModule({
  declarations: [
    UtilitiesComponent,
    LoveCalculatorComponent,
    CovidTrackerComponent,
  ],
  imports: [
    AppCoreModule,
    UtilitiesRoutingModule
  ]
})
export class UtilitiesModule { }
