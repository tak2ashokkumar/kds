import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';
import { HttpClientModule } from '@angular/common/http';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';
import { AppCoreModule } from './app-core/app-core.module'

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    InvalidRouteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppCoreModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
