import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable()
export class ForgotPasswordService {

  constructor(private http: HttpClient,
    private builder: FormBuilder) { }

  resetFormErrors() {
    let formErrors = {
      'email': '',
    }
    return formErrors;
  }

  validationMessages = {
    'email': {
      'required': 'Email is mandatory'
    }
  }

  buildForm(): FormGroup {
    return this.builder.group({
      'email': ['', [Validators.required]],
    })
  }

  validateUserLogin(formValues: ForgotPasswordFrom): Observable<any> {
    return this.http.post<any>('', formValues);
  }
}

class ForgotPasswordFrom {
  email: string;
}
