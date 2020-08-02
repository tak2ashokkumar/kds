import { NgModule } from '@angular/core';
import { AppCoreModule } from '../app-core/app-core.module';
import { AppNotificationsComponent } from './app-notifications/app-notifications.component';
import { SetColumnWidthDirective } from './directives';



@NgModule({
  imports: [
    AppCoreModule
  ],
  exports: [
    AppNotificationsComponent,
    SetColumnWidthDirective
  ],
  declarations: [
    AppNotificationsComponent,
    SetColumnWidthDirective,
  ],
})
export class SharedModule { }
