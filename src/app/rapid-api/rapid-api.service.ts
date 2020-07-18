import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { RAPID_API_KEY } from './rapid-api-authentication.const';
import { LoveCalculatorOutput, CovidStatisticsObject } from './rapid-api.type';
import { GET_LOVE_PERCENTAGE, GET_COVID_DATA } from './rapid-api-endpoint.const';

import { FormValues } from '../utilities/love-calculator/love-calculator.service';

@Injectable({
  providedIn: 'root'
})
export class RapidApiService {

  constructor(private http: HttpClient) { }

  getPercentageByNames(formData: FormValues): Observable<LoveCalculatorOutput> {
    let headers: HttpHeaders = new HttpHeaders().set('x-rapidapi-host', 'love-calculator.p.rapidapi.com').append('x-rapidapi-key', RAPID_API_KEY());
    return this.http.get<LoveCalculatorOutput>(GET_LOVE_PERCENTAGE(formData.boyname, formData.girlname), { headers: headers });
  }

  getCovidStatistics(country?: string): Observable<CovidStatisticsObject> {
    let headers: HttpHeaders = new HttpHeaders().set('x-rapidapi-host', 'covid-193.p.rapidapi.com').append('x-rapidapi-key', RAPID_API_KEY());
    return this.http.get<CovidStatisticsObject>(GET_COVID_DATA(country), { headers: headers });
  }
}
