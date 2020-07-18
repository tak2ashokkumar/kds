import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GET_QUOTE_OF_THE_DAY } from '../rapid-api/rapid-api-endpoint.const';
import { QUOTE_OF_THE_DAY_HOST, RAPID_API_KEY } from '../rapid-api/rapid-api-authentication.const';
import { RandomQuoteDetails } from '../rapid-api/rapid-api.type'

@Injectable()
export class AppHeaderService {

  constructor(private http: HttpClient) { }

  getTodaysQuote(): Observable<RandomQuoteDetails> {
    let headers: HttpHeaders = new HttpHeaders().set('x-rapidapi-host', QUOTE_OF_THE_DAY_HOST()).append('x-rapidapi-key', RAPID_API_KEY());
    return this.http.get<RandomQuoteDetails>(GET_QUOTE_OF_THE_DAY(), { headers: headers });
  }

  convertToViewData(quote: RandomQuoteDetails): QuoteDetailsViewData {
    let viewData: QuoteDetailsViewData = new QuoteDetailsViewData();
    viewData.text = quote.content;
    viewData.author = quote.originator.name;
    return viewData;
  }
}

export class QuoteDetailsViewData {
  author: string;
  text: string;
}
