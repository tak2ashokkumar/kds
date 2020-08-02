import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { AppNotificationsService } from './app-notifications.service';
import { Router, NavigationEnd } from '@angular/router';
import { NotificationType, Notification } from './notification.type';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './app-notifications.component.html',
  styleUrls: ['./app-notifications.component.scss']
})
export class AppNotificationsComponent implements OnInit, OnDestroy {

  alerts: Notification[] = [];
  private ngUnsubscribe = new Subject();
  constructor(private notificationService: AppNotificationsService,
    private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.alerts = this.alerts.filter(a => a.type == NotificationType.SUCCESS);
      }
    });
  }

  ngOnInit() {
    this.notificationService.notificationAnnounced$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((notification: Notification) => {
      notification.type == NotificationType.SUCCESS ? notification.timeout = 5000 : notification.timeout = null;
      this.alerts.push(notification);
    });
  }

  onClosed(index: number): void {
    this.alerts.splice(index, 1);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
