import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { GET_LOVE_PERCENTAGE, RAPID_API_KEY } from 'src/app/rapid-api-const';

@Injectable()
export class LoveCalculatorService {

  constructor(private http: HttpClient) { }

  getPercentageByNames() {
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('x-rapidapi-host', 'love-calculator.p.rapidapi.com')
      .append('x-rapidapi-key', RAPID_API_KEY())
    return this.http.get(GET_LOVE_PERCENTAGE('Ashok', 'Yeswitha'), { headers: headers });
  }
}
