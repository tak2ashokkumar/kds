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
  selectedApplicationData: string = null;

  constructor(private utilService: UtilitiesService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route.params.subscribe(param => {
      // console.log('param : ', param);
      this.selectedApplicationName = param.appName;
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
      // console.log('this.selectedApplicationName : ', this.selectedApplicationName);
      for (var i = 0; i < this.applications.length; i++) {
        if (this.applications[i].name == this.selectedApplicationName) {
          this.selectedApplication = this.applications[i];
        }
      }
      // console.log('this.selectedApplication : ', this.selectedApplication);
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        // console.log('this.selectedApplicationData : ', this.selectedApplicationData);
        if (this.selectedApplicationData) {
          this.router.navigate([this.selectedApplicationData], { relativeTo: this.route });
        } else {
          this.router.navigate([this.selectedApplication.defaultApp], { relativeTo: this.route });
        }
      });
    } else {
      this.selectedApplication = this.applications[0];
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.applications[0].name, this.applications[0].defaultApp], { relativeTo: this.route.parent });
      });
    }
  }

  loadApplication(view: AppData) {
    this.selectedApplication = view;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([view.name, view.defaultApp], { relativeTo: this.route.parent });
    });
  }

}
