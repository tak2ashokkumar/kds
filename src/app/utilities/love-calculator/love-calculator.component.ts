import { Component, OnInit } from '@angular/core';
import { LoveCalculatorService, LoveCalculatorOutput } from './love-calculator.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

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
      this.loveCalculatorService.getPercentageByNames(this.form.getRawValue()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        console.log('data : ', data);
        this.result = data;
      }, (err: HttpErrorResponse) => {
        console.log('err in calculating percentage is : ', err);
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
