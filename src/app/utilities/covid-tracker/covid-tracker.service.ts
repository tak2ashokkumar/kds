import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GET_COVID_DATA, RAPID_API_KEY } from 'src/app/rapid-api-const';

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

  getPercentageByNames(formData: any): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders().set('x-rapidapi-host', 'love-calculator.p.rapidapi.com').append('x-rapidapi-key', RAPID_API_KEY());
    return this.http.get<any>(GET_COVID_DATA(), { headers: headers });
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
