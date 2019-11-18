import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppPromotionsRoutingModule } from './app-promotions-routing.module';
import { AppPromotionsComponent } from './app-promotions.component';
import { CredComponent } from './cred/cred.component';
import { TrueBalanceComponent } from './true-balance/true-balance.component';
import { AppHeaderComponent } from '../app-header/app-header.component';


@NgModule({
  declarations: [
    AppHeaderComponent,
    AppPromotionsComponent, 
    CredComponent, 
    TrueBalanceComponent
  ],
  imports: [
    CommonModule,
    AppPromotionsRoutingModule,

  ]
})
export class AppPromotionsModule { }
