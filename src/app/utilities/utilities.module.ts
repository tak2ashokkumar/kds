import { NgModule } from '@angular/core';
import { AppCoreModule } from '../app-core/app-core.module';
import { UtilitiesRoutingModule } from './utilities-routing.module';

import { AlertModule } from 'ngx-bootstrap/alert';
import { NgpSortModule } from "ngp-sort-pipe";
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { UtilitiesComponent } from './utilities.component';
import { HtmlToPdfConverterComponent } from './html-to-pdf-converter/html-to-pdf-converter.component';
import { CovidTrackerComponent } from './covid-tracker/covid-tracker.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';


@NgModule({
  declarations: [
    UtilitiesComponent,
    HtmlToPdfConverterComponent,
    CovidTrackerComponent,
    LoveCalculatorComponent,
  ],
  imports: [
    AppCoreModule,
    UtilitiesRoutingModule,
    TabsModule.forRoot(),
    AlertModule.forRoot(),
    PopoverModule.forRoot(),
    NgpSortModule
  ]
})
export class UtilitiesModule { }
