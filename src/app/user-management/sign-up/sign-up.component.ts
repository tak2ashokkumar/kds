import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { SignUpService } from './sign-up.service'
import { AppUtilityService } from 'src/app/app-core/app-utility.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponseObject } from 'src/app/app-core/firebase.component';
import { AppNotificationsService } from 'src/app/shared/app-notifications/app-notifications.service';
import { Notification } from 'src/app/shared/app-notifications/notification.type';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [SignUpService]
})
export class SignUpComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  signUpForm: FormGroup;
  signUpFormErrors: any;
  signUpFormValidationMessages: any;

  loadingData: boolean = false;
  constructor(private signUpService: SignUpService,
    private router: Router,
    private route: ActivatedRoute,
    private utilService: AppUtilityService,
    private notificationService: AppNotificationsService) { }

  ngOnInit(): void {
    this.buildFrom();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  buildFrom() {
    this.signUpForm = this.signUpService.buildForm();
    this.signUpFormErrors = this.signUpService.resetFormErrors();
    this.signUpFormValidationMessages = this.signUpService.validationMessages;
  }

  onSubmit() {
    if (this.signUpForm.invalid) {
      this.signUpFormErrors = this.utilService.validateForm(this.signUpForm, this.signUpFormValidationMessages, this.signUpFormErrors);
      this.signUpForm.valueChanges
        .subscribe((data: any) => { this.signUpFormErrors = this.utilService.validateForm(this.signUpForm, this.signUpFormValidationMessages, this.signUpFormErrors); });
      return;
    } else {
      this.loadingData = true;
      this.signUpService.checkUserExists(this.signUpForm.getRawValue()).then(doc => {
        if (doc.exists) {
          this.notificationService.warning(new Notification('User already registered. Please login to access KiddySaves.'));
          this.loadingData = false;
        } else {
          this.signUpService.addUser(this.signUpForm.getRawValue()).then(() => {
            this.goToLogin();
            this.notificationService.success(new Notification('Registered to KiddySaves successfully. Please login to access KiddySaves.'));
          }).catch(error => {
            this.notificationService.error(new Notification('Failed to register. Please try after sometime.'));
          }).finally(() => {
            this.loadingData = false;
          })
        }
      }).catch(error => {
        this.notificationService.error(new Notification('Failed to register. Please try after sometime.'));
      })
    }
  }

  goToLogin() {
    this.router.navigate(['login'], { relativeTo: this.route.parent });
  }
}
