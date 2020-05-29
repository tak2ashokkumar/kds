import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'bill-payments',
  templateUrl: './bill-payments.component.html',
  styleUrls: ['./bill-payments.component.scss']
})
export class BillPaymentsComponent implements OnInit {
  imagesUrl: string = environment.images;

  constructor() { }

  ngOnInit(): void {
    console.log('imagesUrl : ', this.imagesUrl);
  }

}
