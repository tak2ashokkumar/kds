import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RAPID_API_KEY, GET_QUOTE_OF_THE_DAY } from '../rapid-api-const';
import { QuoteDetails } from './header.type';
import { Observable } from 'rxjs';

@Injectable()
export class AppHeaderService {

  constructor(private http: HttpClient) { }

  getTodaysQuote(): Observable<QuoteDetails> {
    let headers: HttpHeaders = new HttpHeaders().set('x-rapidapi-host', 'quotes-inspirational-quotes-motivational-quotes.p.rapidapi.com').append('x-rapidapi-key', RAPID_API_KEY());
    return this.http.get<QuoteDetails>(GET_QUOTE_OF_THE_DAY(), { headers: headers });
  }
}

export class QuoteDetailsViewData {
  author: string;
  text: string;
}
