import { Component, OnInit } from '@angular/core';
import { LoveCalculatorService } from './love-calculator.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'love-calculator',
  templateUrl: './love-calculator.component.html',
  styleUrls: ['./love-calculator.component.scss'],
  providers: [LoveCalculatorService]
})
export class LoveCalculatorComponent implements OnInit {
  private ngUnsubscribe = new Subject();

  constructor(private loveCalculatorService: LoveCalculatorService) { 
  }

  ngOnInit(): void {
    console.log('in LoveCalculatorComponent');
    this.getPercentageByNames();
  }

  getPercentageByNames() {
    this.loveCalculatorService.getPercentageByNames().pipe(takeUntil(this.ngUnsubscribe)).subscribe(data => {
      console.log('data : ', data);
    }, (err: HttpErrorResponse) => {
      console.log('err in calculating percentage is : ', err);
    })
  }

}
