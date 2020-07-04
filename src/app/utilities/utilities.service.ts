import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {

  constructor() { }
}

export class AppData {
  displayName: string;
  name: string;
  defaultApp?: string;
}

export const applications: AppData[] = [
  {
    displayName: 'Love Calculator',
    name: 'love-calculator',
    defaultApp: 'calculateLovePercentage'
  },
  {
    displayName: 'COVID-19 Tracking',
    name: 'covid',
    defaultApp: 'covid-tracker'
  }
]
