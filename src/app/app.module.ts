import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app-main/app-main.component';
import { HttpClientModule } from '@angular/common/http';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';
import { AppCoreModuleModule } from './app-core-module/app-core-module.module';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    InvalidRouteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppCoreModuleModule,
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
