import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilitiesService, AppData, applications } from './utilities.service';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'utilities',
  templateUrl: './utilities.component.html',
  styleUrls: ['./utilities.component.scss'],
  providers: [UtilitiesService]
})
export class UtilitiesComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();
  applications: AppData[] = applications;

  selectedApplication: AppData = new AppData();
  selectedApplicationName: string = null;
  selectedApplicationExt: string = null;

  constructor(private router: Router,
    private route: ActivatedRoute) {
    this.route.paramMap.subscribe(param => {
      this.selectedApplicationName = param.get('appName');
      console.log('selectedApplicationName : ', this.selectedApplicationName);
      if (this.selectedApplicationName != this.router.url.split('/').pop()) {
        this.selectedApplicationExt = this.router.url.split('/').pop();
      }
    })
  }

  ngOnInit() {
    this.getAppData();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getAppData() {
    if (this.selectedApplicationName) {
      this.selectedApplication = this.applications.filter(application => application.name == this.selectedApplicationName).shift()
      if (this.selectedApplicationExt) {
        this.router.navigate([this.selectedApplicationExt], { relativeTo: this.route });
      } else {
        this.router.navigate([this.selectedApplication.defaultApp], { relativeTo: this.route });
      }
    } else {
      this.selectedApplication = this.applications[0];
      this.router.navigate([this.applications[0].name, this.applications[0].defaultApp], { relativeTo: this.route.parent });
    }
  }

  loadApplication(view: AppData) {
    this.selectedApplication = view;
    this.router.navigate([view.name, view.defaultApp], { relativeTo: this.route.parent });
  }

}
