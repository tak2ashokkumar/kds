import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GET_COVID_DATA, RAPID_API_KEY } from 'src/app/rapid-api-const';
import { CovidStatisticsObject, CovidResponseItem } from './covid-tracker.type';
import { countries } from 'src/app/app-const';

@Injectable()
export class CovidTrackerService {

  constructor(private http: HttpClient,
    private builder: FormBuilder) { }

  resetStatisticsFormErrors(): any {
    let formErrors = {
      'country': '',
    };
    return formErrors;
  }

  statisticsFormValidationMessages = {
    'country': {
      'required': 'Boy name is required.'
    }
  };


  buildStatisticsForm(): FormGroup {
    this.resetStatisticsFormErrors();
    return this.builder.group({
      'country': ['', [Validators.required]],
    })
  }

  getCovidStatistics(country?: string): Observable<CovidStatisticsObject> {
    let headers: HttpHeaders = new HttpHeaders().set('x-rapidapi-host', 'covid-193.p.rapidapi.com').append('x-rapidapi-key', RAPID_API_KEY());
    return this.http.get<CovidStatisticsObject>(GET_COVID_DATA(country), { headers: headers });
  }

  convertToViewData(results: CovidResponseItem[]): CovidStatisticsData[] {
    let countriesViewData: CovidStatisticsData[] = [];
    results.map(countryRelatedData => {
      if (countries[countryRelatedData.country]) {
        let a: CovidStatisticsData = new CovidStatisticsData();
        a.countryFlagIcon = `flag-icon-${countries[countryRelatedData.country]}`;
        a.continent = countryRelatedData.continent;
        a.country = countryRelatedData.country;
        a.population = countryRelatedData.population;
        a.day = countryRelatedData.day;
        a.time = countryRelatedData.time;
        a.totalCases = countryRelatedData.cases.total;
        a.totalTests = countryRelatedData.tests.total;

        a.newCases = countryRelatedData.cases.new;
        a.activeCases = countryRelatedData.cases.active;
        a.criticalCases = countryRelatedData.cases.critical;
        a.recoveredCases = countryRelatedData.cases.recovered;
        a.totalCases = countryRelatedData.cases.total;

        a.totalDeaths = countryRelatedData.deaths.total;
        a.newDeaths = countryRelatedData.deaths.new;
        countriesViewData.push(a);
      }
    })
    return countriesViewData;
  }

  validateForm(form: FormGroup, validationMessages: any, formErrors: any) {
    if (!form) { return; }
    for (const field in formErrors) {
      if (form.get(field) instanceof FormGroup) {
        this.validateForm(<FormGroup>form.get(field), validationMessages[field], formErrors[field]);
      } else {
        formErrors[field] = '';
        const control = form.get(field);
        if (control && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            if (key === 'whitespace') {
              formErrors[field] += 'Enter valid Input.'
            } else {
              formErrors[field] += messages[key] + ' ';
            }
            break;
          }
        }
      }
    }
    return formErrors;
  }
}
export class CovidStatisticsData {
  continent: string;
  country: string;
  countryFlagIcon: string;
  day: string;
  population: number;
  time: string;
  totalTests: number;

  totalCases: number;
  activeCases: number;
  newCases: string;
  recoveredCases: number;
  criticalCases: number;

  totalDeaths: number;
  newDeaths: number;
  constructor() { }
}