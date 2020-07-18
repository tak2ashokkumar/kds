import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoveCalculatorOutput } from 'src/app/rapid-api/rapid-api.type';
import { LOVE_CALCULATOR_HOST, RAPID_API_KEY } from 'src/app/rapid-api/rapid-api-authentication.const';
import { GET_LOVE_PERCENTAGE } from 'src/app/rapid-api/rapid-api-endpoint.const';

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
    let headers: HttpHeaders = new HttpHeaders().set('x-rapidapi-host', LOVE_CALCULATOR_HOST()).append('x-rapidapi-key', RAPID_API_KEY());
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


