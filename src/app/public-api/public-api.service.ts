import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PDF_FROM_URL, PDF_FROM_URL_TEST } from './public-api-endpoint.const';
import { PUBLIC_API_HTML_TO_PDF_KEY } from './public-api-authentication.const'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {

  constructor(private http: HttpClient) { }

  getUrlToPdfDownloadUrl(url: string) {
    return `${PDF_FROM_URL()}?url=${url}&apiKey=${PUBLIC_API_HTML_TO_PDF_KEY()}`
  }

  getPDFFromURL(url: string): Observable<any> {
    let params: HttpParams = new HttpParams().set('url', url).append('apiKey', PUBLIC_API_HTML_TO_PDF_KEY());
    return this.http.get(PDF_FROM_URL(), { responseType: 'blob', params });
  }
}
