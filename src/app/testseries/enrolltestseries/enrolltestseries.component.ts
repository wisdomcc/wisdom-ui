
import { Component, OnInit, ViewChild } from '@angular/core';
import { TestSeries } from '../../../models/testseries/testseries.model';
import { TestSeriesEnrollment } from '../../../models/testseries/testseries.model';
import { UserService } from '../../../services/user/user.service';
import { TestSeriesService } from '../../../services/testseries/testseries.service';
import { NotificationComponent } from '../../common/notification/notification.component';

@Component({
  selector: 'app-enrolltestseries',
  templateUrl: './enrolltestseries.component.html',
  styleUrls: ['./enrolltestseries.component.css']
})
export class EnrolltestseriesComponent implements OnInit {

  id: string;
  isEnrollmentSuccessful: boolean;
  testSeriesModels: TestSeries[];
  testSeriesEnrollments: TestSeriesEnrollment[];
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private userService: UserService,
              private testSeriesService: TestSeriesService) { }

  ngOnInit() {
    this.id = 'enrolltestseries';
    this.isEnrollmentSuccessful = false;
    this.fetchTestSeriesDetails();
  }

  fetchTestSeriesDetails() {
    this.testSeriesService.fetchTestSeriesModels()
    .subscribe(tsdata => {
      this.testSeriesModels = JSON.parse(tsdata);
      if(this.testSeriesModels.length === 0) {
        this.showNotification("No Test is Available to assign question", "status");
      }
    },
    error => {
      if (error.status === 401) {
        this.userService.logout();
      }
      this.showNotification('Some technical issue. Please try after sometime.', 'error');
    });
  }

  enrollTestSeries() {
    this.testSeriesEnrollments = [];
    for(let i = 0; i < this.testSeriesModels.length; i++) {
      this.testSeriesEnrollments.push(new TestSeriesEnrollment(this.testSeriesModels[i].id));
    }
    this.testSeriesService.enrollTestSeries(this.testSeriesEnrollments)
      .subscribe(tsdata => {
          if(tsdata) {
            this.showNotification("Successfully Enrolled to below mentioned test.", "status");
            this.isEnrollmentSuccessful = true;
          } else {
            this.showNotification("Already enrolled for Test Series.", "status");
          }
          
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some technical issue. Please try after sometime.', 'error');
      });
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}


