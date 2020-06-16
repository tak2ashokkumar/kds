import { NgModule } from '@angular/core';

import { AppPromotionsRoutingModule } from './app-promotions-routing.module';
import { AppPromotionsComponent } from './app-promotions.component';
import { AppHeaderComponent } from '../app-header/app-header.component';
import { AppCoreModule } from '../app-core/app-core.module';


@NgModule({
  declarations: [
    // AppHeaderComponent,
    AppPromotionsComponent,
  ],
  imports: [
    AppCoreModule,
    AppPromotionsRoutingModule
  ]
})
export class AppPromotionsModule { }
