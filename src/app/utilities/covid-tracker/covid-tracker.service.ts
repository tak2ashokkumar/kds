import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GET_COVID_DATA, RAPID_API_KEY } from 'src/app/rapid-api-const';
import { CovidStatisticsObject, CovidResponseItem } from './covid-tracker.type';

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
    let viewData: CovidStatisticsData[] = [];
    results.map(countryRelatedData => {
      let a: CovidStatisticsData = new CovidStatisticsData();
      a.continent = countryRelatedData.continent;
      a.country = countryRelatedData.country;
      a.population = countryRelatedData.population;
      a.day = countryRelatedData.day;
      a.time = countryRelatedData.time;
      a.totalCases = countryRelatedData.cases.total;

      let cc: CovidCase = new CovidCase();
      cc.newCases = countryRelatedData.cases.new;
      cc.activeCases = countryRelatedData.cases.active;
      cc.criticalCases = countryRelatedData.cases.critical;
      cc.recoveredCases = countryRelatedData.cases.recovered;
      cc.totalCases = countryRelatedData.cases.total;

      a.casesData = cc;

      let cd: CovidDeath = new CovidDeath();
      cd.newDeaths = countryRelatedData.deaths.new;
      cd.totalDeaths = countryRelatedData.deaths.total;

      a.deathsData = cd;

      let ct: CovidTest = new CovidTest();
      ct.totalTests = countryRelatedData.tests.total;

      a.testsData = ct;

      viewData.push(a);
    })
    return viewData;
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

export class CovidCase {
  activeCases: number;
  criticalCases: number;
  newCases: string;
  recoveredCases: number;
  totalCases: number;
  constructor() { }
}

export class CovidDeath {
  newDeaths: number;
  totalDeaths: number;
  constructor() { }
}

export class CovidTest {
  totalTests: number;
  constructor() { }
}

export class CovidStatisticsData {
  continent: string;
  country: string;
  day: string;
  population: number;
  time: string;
  totalCases: number;
  casesData: CovidCase;
  deathsData: CovidDeath;
  testsData: CovidTest;
  constructor() { }
}