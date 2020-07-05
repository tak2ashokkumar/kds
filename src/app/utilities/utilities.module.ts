import { NgModule } from '@angular/core';
import { AppCoreModule } from '../app-core/app-core.module';
import { UtilitiesRoutingModule } from './utilities-routing.module';

import { UtilitiesComponent } from './utilities.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';
import { CovidTrackerComponent } from './covid-tracker/covid-tracker.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgpSortModule } from "ngp-sort-pipe";


@NgModule({
  declarations: [
    UtilitiesComponent,
    LoveCalculatorComponent,
    CovidTrackerComponent,
  ],
  imports: [
    AppCoreModule,
    UtilitiesRoutingModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    NgpSortModule
  ]
})
export class UtilitiesModule { }
