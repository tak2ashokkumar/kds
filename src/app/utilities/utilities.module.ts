import { NgModule } from '@angular/core';
import { AppCoreModule } from '../app-core/app-core.module';
import { UtilitiesRoutingModule } from './utilities-routing.module';

import { UtilitiesComponent } from './utilities.component';
import { LoveCalculatorComponent } from './love-calculator/love-calculator.component';


@NgModule({
  declarations: [
    UtilitiesComponent,
    LoveCalculatorComponent,
  ],
  imports: [
    AppCoreModule,
    UtilitiesRoutingModule
  ]
})
export class UtilitiesModule { }
