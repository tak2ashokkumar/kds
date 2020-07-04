import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { CovidTrackerService } from './covid-tracker.service'
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'covid-tracker',
  templateUrl: './covid-tracker.component.html',
  styleUrls: ['./covid-tracker.component.scss'],
  providers: [CovidTrackerService]
})
export class CovidTrackerComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  result: any;

  covidStatisticsForm: FormGroup;
  covidStatisticsFormErrors: any;
  covidStatisticsFormValidationMessages: any;

  constructor(private covidTracker: CovidTrackerService) { }

  ngOnInit(): void {
    this.buildCovidStatisticsForm();
  }

  buildCovidStatisticsForm() {
    // this.result = new LoveCalculatorOutput();
    this.covidStatisticsForm = this.covidTracker.buildStatisticsForm();
    this.covidStatisticsFormErrors = this.covidTracker.resetStatisticsFormErrors();
    this.covidStatisticsFormValidationMessages = this.covidTracker.statisticsFormValidationMessages;
  }

  getDetails() {
    if (this.covidStatisticsForm.invalid) {
      this.covidStatisticsFormErrors = this.covidTracker.validateForm(this.covidStatisticsForm, this.covidStatisticsFormValidationMessages, this.covidStatisticsFormErrors);
      this.covidStatisticsForm.valueChanges
        .subscribe((data: any) => { this.covidStatisticsFormErrors = this.covidTracker.validateForm(this.covidStatisticsForm, this.covidStatisticsFormValidationMessages, this.covidStatisticsFormErrors); });
      return;
    } else {
      this.covidTracker.getPercentageByNames(this.covidStatisticsForm.getRawValue()).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
        console.log('data : ', data);
        this.result = data;
      }, (err: HttpErrorResponse) => {
        console.log('err in calculating percentage is : ', err);
      })
    }
  }

}
