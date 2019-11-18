import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AppPromotionsService {

  constructor(private http: HttpClient) { }

  getLiveCricketScores(){
    // this.http.get()
  }
}
