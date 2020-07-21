import { Component, OnInit } from '@angular/core';
import { LoveCalculatorService } from './love-calculator.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { LoveCalculatorOutput } from 'src/app/rapid-api/rapid-api.type';

@Component({
  selector: 'love-calculator',
  templateUrl: './love-calculator.component.html',
  styleUrls: ['./love-calculator.component.scss'],
  providers: [LoveCalculatorService]
})
export class LoveCalculatorComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  form: FormGroup;
  formErrors: any;
  validationMessages: any;

  result: LoveCalculatorOutput = new LoveCalculatorOutput();
  loadingData: boolean = false;

  constructor(private loveCalculatorService: LoveCalculatorService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.result = new LoveCalculatorOutput();
    this.form = this.loveCalculatorService.buildForm();
    this.formErrors = this.loveCalculatorService.resetFormErrors();
    this.validationMessages = this.loveCalculatorService.validationMessages;
  }

  calculate() {
    if (this.form.invalid) {
      this.formErrors = this.loveCalculatorService.validateForm(this.form, this.validationMessages, this.formErrors);
      this.form.valueChanges
        .subscribe((data: any) => { this.formErrors = this.loveCalculatorService.validateForm(this.form, this.validationMessages, this.formErrors); });
      return;
    } else {
      this.loadingData = true;
      this.loveCalculatorService.getPercentageByNames(this.form.getRawValue()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        this.result = data;
        this.loadingData = false;
      }, (err: HttpErrorResponse) => {
        console.log('err in calculating percentage is : ', err);
        this.loadingData = false;
      })
    }
  }

  getClass() {
    const percentage = Number(this.result.percentage)
    if (percentage >= 50) {
      return 'success';
    } else if (percentage >= 30) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
}
