import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { ForgotPasswordService } from './forgot-password.service';
import { AppUtilityService } from 'src/app/app-core/app-utility.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  providers: [ForgotPasswordService]
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  forgotPasswordForm: FormGroup;
  forgotPasswordFormErrors: any;
  forgotPasswordFormValidationMessages: any;

  loadingData: boolean = false;
  constructor(private forgotPasswordService: ForgotPasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: AppUtilityService) { }

  ngOnInit(): void {
    this.buildFrom();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  buildFrom() {
    this.forgotPasswordForm = this.forgotPasswordService.buildForm();
    this.forgotPasswordFormErrors = this.forgotPasswordService.resetFormErrors();
    this.forgotPasswordFormValidationMessages = this.forgotPasswordService.validationMessages;
  }

  onSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordFormErrors = this.utilService.validateForm(this.forgotPasswordForm, this.forgotPasswordFormValidationMessages, this.forgotPasswordFormErrors);
      this.forgotPasswordForm.valueChanges
        .subscribe((data: any) => { this.forgotPasswordFormErrors = this.utilService.validateForm(this.forgotPasswordForm, this.forgotPasswordFormValidationMessages, this.forgotPasswordFormErrors); });
      return;
    } else {
      this.loadingData = true;
      this.forgotPasswordService.validateUserLogin(this.forgotPasswordForm.getRawValue()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        this.loadingData = false;
      }, (err: HttpErrorResponse) => {
        console.log('login failed with error : ', err);
        this.loadingData = false;
      })
    }
  }

  goToSignUp() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  goToLogin() {
    this.router.navigate(['login'], { relativeTo: this.route.parent });
  }

}
