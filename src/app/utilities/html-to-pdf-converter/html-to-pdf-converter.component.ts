import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { HtmlToPdfConverterService } from './html-to-pdf-converter.service';
import { FormGroup } from '@angular/forms';
import { AppUtilityService } from 'src/app/app-core/app-utility.service';
import { PublicApiService } from 'src/app/public-api/public-api.service';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'html-to-pdf-converter',
  templateUrl: './html-to-pdf-converter.component.html',
  styleUrls: ['./html-to-pdf-converter.component.scss'],
  providers: [HtmlToPdfConverterService]
})
export class HtmlToPdfConverterComponent implements OnInit, OnDestroy {

  private ngUnsubscribe = new Subject();
  value: string;

  urlToPdfForm: FormGroup;
  urlToPdfFormErrors: any;
  urlToPdfFormValidationMessages: any;
  urlToPdfDownloadRef: string = null;

  constructor(private htmlToPdfService: HtmlToPdfConverterService,
    private publicApiService: PublicApiService,
    private utilService: AppUtilityService) { }

  ngOnInit(): void {
    this.buildUrlToPdfForm();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  buildUrlToPdfForm() {
    this.urlToPdfForm = this.htmlToPdfService.buildUrlToPdfForm();
    this.urlToPdfFormErrors = this.htmlToPdfService.resetUrlToPdfForm();
    this.urlToPdfFormValidationMessages = this.htmlToPdfService.urlToPdfFormValidationMessages;
  }

  onSelect(data: TabDirective): void {
    if (data.heading == 'Convert URL to PDF') {
      this.buildUrlToPdfForm();
    } else {

    }
  }

  onSubmitUrlToPdfForm() {
    if (this.urlToPdfForm.invalid) {
      this.urlToPdfFormErrors = this.utilService.validateForm(this.urlToPdfForm, this.urlToPdfFormValidationMessages, this.urlToPdfFormErrors);
      this.urlToPdfForm.valueChanges
        .subscribe((data: any) => { this.urlToPdfFormErrors = this.utilService.validateForm(this.urlToPdfForm, this.urlToPdfFormValidationMessages, this.urlToPdfFormErrors); });
      return false;
    } else {
      this.publicApiService.getPDFFromURL(this.urlToPdfForm.getRawValue().url).pipe(takeUntil(this.ngUnsubscribe)).subscribe(blob => {
        const objectUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectUrl
        a.download = 'archive.pdf';
        a.click();
        URL.revokeObjectURL(objectUrl);
      }, (err: HttpErrorResponse) => {
        console.log('err in convering to pdf is : ', err);
      })
    }
  }

}
