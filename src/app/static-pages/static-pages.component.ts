import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-static-pages',
  templateUrl: './static-pages.component.html',
  styleUrls: ['./static-pages.component.scss']
})
export class StaticPagesComponent implements OnInit {

  isCred: boolean = false;
  isTrueBalance: boolean = false;
  constructor(private router: Router) { }

  ngOnInit() {
    this.isCred = this.router.url.includes('cred');
    this.isTrueBalance = this.router.url.includes('true_balance');
  }

}
