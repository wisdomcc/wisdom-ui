import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { SearchfilterComponent } from '../../../question/common/searchfilter/searchfilter.component';
import { TestSeries } from '../../../../models/testseries/testseries.model';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { UserService } from '../../../../services/user/user.service';
import { QuestionService } from '../../../../services/question/question.service';
import { TestSeriesService } from '../../../../services/testseries/testseries.service';
import { NotificationComponent } from '../../../common/notification/notification.component';
import { QuestionpreviewComponent } from '../questionpreview/questionpreview.component';

@Component({
  selector: 'app-testseriesassignment',
  templateUrl: './testseriesassignment.component.html',
  styleUrls: ['./testseriesassignment.component.css']
})
export class TestseriesassignmentComponent implements OnInit {

  id: string;
  imageBaseUrl: string;
  isDataPresent: boolean;
  testSeriesModels: TestSeries[];
  selectedTestSeriesId: any;
  isAssignQuestionSelected: boolean;
  isViewAssignedQuestionSelected: boolean;
  isUnassignQuestionSelected: boolean;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService,
              private testSeriesService: TestSeriesService) { }

  ngOnInit() {
    this.selectedTestSeriesId = '';
    this.isAssignQuestionSelected = false;
    this.isViewAssignedQuestionSelected = false;
    this.isUnassignQuestionSelected = false;
    this.isDataPresent = false;
    this.imageBaseUrl = this.questionService.getImageUrl;
    this.id = 'testseriesassignment';
    this.fetchTestSeriesDetails();
  }

  fetchTestSeriesDetails() {
    this.testSeriesService.fetchTestSeriesModels()
    .subscribe(tsdata => {
      this.testSeriesModels = JSON.parse(tsdata);
      if (this.testSeriesModels.length === 0) {
        this.showNotification('No Test is Available to assign question', 'warning', 10000);
      }
    },
    error => {
      if (error.status === 401) {
        this.userService.logout();
      }
      this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
    });
  }

  setAssignQuestionSelected() {
    this.isAssignQuestionSelected = true;
    this.isUnassignQuestionSelected = false;
    this.isViewAssignedQuestionSelected = false;
  }

  setViewAssignedQuestionSelected() {
    this.isAssignQuestionSelected = false;
    this.isUnassignQuestionSelected = false;
    this.isViewAssignedQuestionSelected = true;
  }

  setUnassignQuestionSelected() {
    this.isAssignQuestionSelected = false;
    this.isUnassignQuestionSelected = true;
    this.isViewAssignedQuestionSelected = false;
  }

  setAllFalse() {
    this.isAssignQuestionSelected = false;
    this.isUnassignQuestionSelected = false;
    this.isViewAssignedQuestionSelected = false;
  }

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

}

