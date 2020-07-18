import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { CovidTrackerService, CovidStatisticsData } from './covid-tracker.service'
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { countries } from 'src/app/app-const';

@Component({
  selector: 'covid-tracker',
  templateUrl: './covid-tracker.component.html',
  styleUrls: ['./covid-tracker.component.scss'],
  providers: [CovidTrackerService]
})
export class CovidTrackerComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  covidStatisticsForm: FormGroup;
  covidStatisticsFormErrors: any;
  covidStatisticsFormValidationMessages: any;

  uncheckableRadioModel: string = 'statistics';
  covidResults: CovidStatisticsData[] = [];
  selectedResult: CovidStatisticsData = new CovidStatisticsData();
  loadingData: boolean = false;

  countryCodes: countries;

  constructor(private covidTracker: CovidTrackerService) { }

  ngOnInit(): void {
    this.getCovidStatistics();
  }

  buildCovidStatisticsForm() {
    this.covidResults = [];
    this.covidStatisticsForm = this.covidTracker.buildStatisticsForm();
    this.covidStatisticsFormErrors = this.covidTracker.resetStatisticsFormErrors();
    this.covidStatisticsFormValidationMessages = this.covidTracker.statisticsFormValidationMessages;
  }

  sortBy(prop: string) {
    return this.covidResults.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }

  getCovidStatistics(country?: string) {
    this.loadingData = true;
    this.covidTracker.getCovidStatistics(country).pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      this.covidResults = this.covidTracker.convertToViewData(data.response);
      this.loadingData = false;
    }, (err: HttpErrorResponse) => {
      this.loadingData = false;
      console.log('err in getting covid results : ', err);
    })
  }

  getDetails() {
    if (this.covidStatisticsForm.invalid) {
      this.covidStatisticsFormErrors = this.covidTracker.validateForm(this.covidStatisticsForm, this.covidStatisticsFormValidationMessages, this.covidStatisticsFormErrors);
      this.covidStatisticsForm.valueChanges.subscribe((data: any) => {
        this.covidStatisticsFormErrors = this.covidTracker.validateForm(this.covidStatisticsForm, this.covidStatisticsFormValidationMessages, this.covidStatisticsFormErrors);
      });
      return;
    } else {
      this.getCovidStatistics();
    }
  }

  showSelectedResult(result : CovidStatisticsData) {
    this.selectedResult = result; 
  }

}
