import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GENERATE_PDF } from './public-api-endpoint.const';
import { PUBLIC_API_HTML_TO_PDF_KEY } from './public-api-authentication.const'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {

  constructor(private http: HttpClient) { }

  getPDFFromURL(url: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let data: Test = new Test();
    data.apiKey = PUBLIC_API_HTML_TO_PDF_KEY();
    data.url = url;
    return this.http.post(GENERATE_PDF(), data, { headers, responseType: 'blob' });
  }

  getPDFFromHTML(html: string): Observable<Blob> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let data: Test = new Test();
    data.apiKey = PUBLIC_API_HTML_TO_PDF_KEY();
    data.html = html;
    return this.http.post(GENERATE_PDF(), data, { headers, responseType: 'blob' });
  }
}

class Test {
  apiKey: string;
  url?: string;
  html?: string;
  constructor() { }
}

