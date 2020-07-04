import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GET_LOVE_PERCENTAGE, RAPID_API_KEY } from 'src/app/rapid-api-const';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export class LoveCalculatorService {

  constructor(private http: HttpClient,
    private builder: FormBuilder) { }

  resetFormErrors(): any {
    let formErrors = {
      'boyname': '',
      'girlname': '',
    };
    return formErrors;
  }

  validationMessages = {
    'boyname': {
      'required': 'Boy name is required.'
    },
    'girlname': {
      'required': 'Girl name is required.'
    }
  };


  buildForm(): FormGroup {
    this.resetFormErrors();
    return this.builder.group({
      'boyname': ['', [Validators.required]],
      'girlname': ['', [Validators.required]]
    })
  }

  getPercentageByNames(formData: FormValues): Observable<LoveCalculatorOutput> {
    let headers: HttpHeaders = new HttpHeaders().set('x-rapidapi-host', 'love-calculator.p.rapidapi.com').append('x-rapidapi-key', RAPID_API_KEY());
    return this.http.get<LoveCalculatorOutput>(GET_LOVE_PERCENTAGE(formData.boyname, formData.girlname), { headers: headers });
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

export class FormValues {
  boyname: string;
  girlname: string;
  constructor() { }
}

export class LoveCalculatorOutput {
  fname: string;
  sname: string;
  percentage: string;
  result: string;
  constructor() { }
}
