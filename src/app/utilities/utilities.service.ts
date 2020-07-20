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
    displayName: 'Html to PDF Coverter',
    name: 'html-to-pdf',
    defaultApp: 'pdf-generator'
  },
  {
    displayName: 'COVID-19 Tracking',
    name: 'covid',
    defaultApp: 'covid-tracker'
  },
  {
    displayName: 'Love Calculator',
    name: 'love-calculator',
    defaultApp: 'calculateLovePercentage'
  },
]

export enum countries {
  india = 'in',
  China = '',
  Italy = '',
}
