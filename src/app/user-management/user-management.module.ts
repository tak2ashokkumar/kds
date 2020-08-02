import { NgModule } from '@angular/core';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AppCoreModule } from '../app-core/app-core.module';


@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent, SignUpComponent],
  imports: [
    AppCoreModule,
    UserManagementRoutingModule
  ],
  exports:[]
})
export class UserManagementModule { }
