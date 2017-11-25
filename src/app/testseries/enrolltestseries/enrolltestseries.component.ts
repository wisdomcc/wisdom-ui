import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TestSeries } from '../../../models/testseries/testseries.model';
import { TestSeriesEnrollment } from '../../../models/testseries/testseries.model';
import { UserService } from '../../../services/user/user.service';
import { UtilityService } from '../../../services/utility/utility.service';
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
  isAlreadyEnrolled: boolean;
  startTestSeriesUrl: string;
  testSeriesModels: TestSeries[];
  testSeriesEnrollments: TestSeriesEnrollment[];
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private userService: UserService,
              private testSeriesService: TestSeriesService,
              private router: Router,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.id = 'enrolltestseries';
    this.isEnrollmentSuccessful = false;
    this.isAlreadyEnrolled = false;
    this.startTestSeriesUrl = '/testseries';
    if(this.utilityService.getBooleanDataFromLocalStorage('isAlreadyEnrolled')) {
      this.isAlreadyEnrolled = true;
      this.testSeriesModels = this.utilityService.getJsonDataFromLocalStorage('testSeriesModels');
    } else {
      this.checkIsAlreadyEnrolledForTestSeries();
    }
  }

  checkIsAlreadyEnrolledForTestSeries() {
    this.testSeriesService.fetchEnrolledTestSeriesModels()
    .subscribe(tsdata => {
      this.testSeriesModels = JSON.parse(tsdata);
      if(this.testSeriesModels.length > 0) {
        this.isAlreadyEnrolled = true;
        this.utilityService.setBooleanDataToLocalStorage('isAlreadyEnrolled', this.isAlreadyEnrolled);
        this.showNotification("Already Enrolled in Test Series Mentioned Below.", "status");
      } else {
        this.fetchTestSeriesDetails();
      }
      this.utilityService.setJsonDataToLocalStorage('testSeriesModels', this.testSeriesModels);
    },
    error => {
      if (error.status === 401) {
        this.userService.logout();
      }
      this.showNotification('Some technical issue. Please try after sometime.', 'error');
    });
  }

  fetchTestSeriesDetails() {
    this.testSeriesService.fetchTestSeriesModels()
    .subscribe(tsdata => {
      this.testSeriesModels = JSON.parse(tsdata);
      if(this.testSeriesModels.length === 0) {
        this.showNotification("No Test Series is Available for Enrollment.", "status");
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

  startTestSeries() {
    if(window.location.href.indexOf('/profile') > 0) {
      this.router.navigateByUrl('/profile' + this.startTestSeriesUrl);
    } else {
      this.router.navigateByUrl(this.startTestSeriesUrl);
    }
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}
