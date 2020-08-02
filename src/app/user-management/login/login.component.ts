import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AppUtilityService } from 'src/app/app-core/app-utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppNotificationsService } from 'src/app/shared/app-notifications/app-notifications.service';
import { Notification } from 'src/app/shared/app-notifications/notification.type';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  private ngUnsubscribe = new Subject();
  loginForm: FormGroup;
  loginFormErrors: any;
  loginFormValidationMessages: any;

  loadingData: boolean = false;

  constructor(private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: AppUtilityService,
    private noficationService: AppNotificationsService) { }

  ngOnInit(): void {
    this.buildFrom();
  }

  buildFrom() {
    this.loginForm = this.loginService.buildForm();
    this.loginFormErrors = this.loginService.resetFormErrors();
    this.loginFormValidationMessages = this.loginService.validationMessages;
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginFormErrors = this.utilService.validateForm(this.loginForm, this.loginFormValidationMessages, this.loginFormErrors);
      this.loginForm.valueChanges
        .subscribe((data: any) => { this.loginFormErrors = this.utilService.validateForm(this.loginForm, this.loginFormValidationMessages, this.loginFormErrors); });
      return;
    } else {
      this.loadingData = true;
      this.loginService.getUserWithCredentials(this.loginForm.getRawValue()).then(doc => {
        this.router.navigate(['/utils/html-to-pdf'], { relativeTo: this.route.parent.parent })
      }).catch(error => {
        this.noficationService.error(new Notification('Invalid Credentials'));
      });
    }
  }

  goToSignUp() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  goToForgotPassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

}
