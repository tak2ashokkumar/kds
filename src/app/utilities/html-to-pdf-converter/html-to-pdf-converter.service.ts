import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PublicApiService } from 'src/app/public-api/public-api.service';

@Injectable()
export class HtmlToPdfConverterService {

  constructor(private builder: FormBuilder) { }

  resetUrlToPdfForm() {
    let UrlToPdfFormErrors = {
      'url': '',
    };
    return UrlToPdfFormErrors;
  }

  urlToPdfFormValidationMessages = {
    'url': {
      'required': 'URL should be provided.'
    },
  };

  buildUrlToPdfForm(): FormGroup {
    return this.builder.group({
      'url': ['', Validators.required]
    })
  }
}
