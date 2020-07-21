import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { HtmlToPdfConverterService } from './html-to-pdf-converter.service';
import { FormGroup } from '@angular/forms';
import { AppUtilityService } from 'src/app/app-core/app-utility.service';
import { PublicApiService } from 'src/app/public-api/public-api.service';
import { takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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

  htmlToPdfForm: FormGroup;
  htmlToPdfFormErrors: any;
  htmlToPdfFormValidationMessages: any;
  htmlEditorTextMode: boolean = true;

  isAPIOn: boolean = false;

  config = editorConfig;

  constructor(private htmlToPdfService: HtmlToPdfConverterService,
    private publicApiService: PublicApiService,
    private utilService: AppUtilityService) { }

  ngOnInit(): void {
    this.buildUrlToPdfForm();
    this.buildHtmlToPdfForm();
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

  buildHtmlToPdfForm() {
    this.htmlToPdfForm = this.htmlToPdfService.buildHTMLToPdfForm();
    this.htmlToPdfFormErrors = this.htmlToPdfService.resetHTMLToPdfForm();
    this.htmlToPdfFormValidationMessages = this.htmlToPdfService.htmlToPdfFormValidationMessages;
  }

  onSelect(data: TabDirective): void {
    if (data.heading == 'Convert URL to PDF') {
      this.buildUrlToPdfForm();
    } else {
      this.buildHtmlToPdfForm();

      // setTimeout(() => {
      //   const element = document.getElementById('toggleEditorMode-htmlcontent');
      //   element.click();
      // })
    }
  }

  onSubmitUrlToPdfForm() {
    if (this.urlToPdfForm.invalid) {
      this.urlToPdfFormErrors = this.utilService.validateForm(this.urlToPdfForm, this.urlToPdfFormValidationMessages, this.urlToPdfFormErrors);
      this.urlToPdfForm.valueChanges
        .subscribe((data: any) => { this.urlToPdfFormErrors = this.utilService.validateForm(this.urlToPdfForm, this.urlToPdfFormValidationMessages, this.urlToPdfFormErrors); });
      return false;
    } else {
      this.isAPIOn = true;
      this.publicApiService.getPDFFromURL(this.urlToPdfForm.getRawValue().url).pipe(takeUntil(this.ngUnsubscribe)).subscribe(blob => {
        this.isAPIOn = false;
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'archive.pdf';
        a.click();
        URL.revokeObjectURL(objectUrl);
      }, (err: HttpErrorResponse) => {
        // console.log('err in convering to pdf is : ', err);
        this.urlToPdfFormErrors.url = err.message;
        this.isAPIOn = false;
      })
    }
  }

  onSubmitHTMLToPdfForm() {
    if (this.htmlToPdfForm.invalid) {
      this.htmlToPdfFormErrors = this.utilService.validateForm(this.htmlToPdfForm, this.htmlToPdfFormValidationMessages, this.htmlToPdfFormErrors);
      this.htmlToPdfForm.valueChanges
        .subscribe((data: any) => { this.htmlToPdfFormErrors = this.utilService.validateForm(this.htmlToPdfForm, this.htmlToPdfFormValidationMessages, this.htmlToPdfFormErrors); });
      return false;
    } else {
      this.isAPIOn = true;
      this.publicApiService.getPDFFromHTML(this.htmlToPdfForm.getRawValue().htmlcontent).pipe(takeUntil(this.ngUnsubscribe)).subscribe(blob => {
        this.isAPIOn = false;
        const a = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        a.href = objectUrl;
        a.download = 'file.pdf';
        a.click();
        URL.revokeObjectURL(objectUrl);
      }, (err: HttpErrorResponse) => {
        // console.log('err in convering to pdf is : ', err);
        this.htmlToPdfFormErrors.htmlcontent = err.message;
        this.isAPIOn = false;
      })
    }
  }

  changed() {
    this.htmlEditorTextMode = !this.htmlEditorTextMode;
    if (this.htmlEditorTextMode) {
      this.config.placeholder = 'Enter Text here';
    } else {
      this.config.placeholder = 'Enter HTML code you want to convert';
    }
  }

}

const editorConfig: AngularEditorConfig = {
  editable: true,
  spellcheck: true,
  height: '15rem',
  minHeight: '5rem',
  maxHeight: 'auto',
  width: 'auto',
  minWidth: '0',
  translate: 'yes',
  enableToolbar: true,
  showToolbar: true,
  placeholder: 'Enter Text here',
  defaultParagraphSeparator: 'p',
  defaultFontName: 'Arial',
  defaultFontSize: '',
  fonts: [
    { class: 'arial', name: 'Arial' },
    { class: 'times-new-roman', name: 'Times New Roman' },
    { class: 'calibri', name: 'Calibri' },
    { class: 'comic-sans-ms', name: 'Comic Sans MS' }
  ],
  customClasses: [
    {
      name: 'quote',
      class: 'quote',
    },
    {
      name: 'redText',
      class: 'redText'
    },
    {
      name: 'titleText',
      class: 'titleText',
      tag: 'h1',
    },
  ],
  uploadUrl: 'v1/image',
  uploadWithCredentials: false,
  sanitize: true,
  toolbarPosition: 'top',
  toolbarHiddenButtons: []
};
