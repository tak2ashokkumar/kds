import { NgModule } from '@angular/core';
import { AppCoreModule } from '../app-core/app-core.module';
import { UtilitiesRoutingModule } from './utilities-routing.module';

import { UtilitiesComponent } from './utilities.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';
import { CovidTrackerComponent } from './covid-tracker/covid-tracker.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgpSortModule } from "ngp-sort-pipe";
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';


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
    ModalModule.forRoot(),
    PopoverModule.forRoot(),
    NgpSortModule
  ]
})
export class UtilitiesModule { }
