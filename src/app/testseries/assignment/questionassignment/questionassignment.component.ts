import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { SearchfilterComponent } from '../../../question/common/searchfilter/searchfilter.component';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { UserService } from '../../../../services/user/user.service';
import { QuestionService } from '../../../../services/question/question.service';
import { TestSeriesService } from '../../../../services/testseries/testseries.service';
import { NotificationComponent } from '../../../common/notification/notification.component';
import { QuestionpreviewComponent } from '../questionpreview/questionpreview.component';

@Component({
  selector: 'app-questionassignment',
  templateUrl: './questionassignment.component.html',
  styleUrls: ['./questionassignment.component.css']
})
export class QuestionassignmentComponent implements OnInit {

  id: string;
  isDataPresent: boolean;
  selectedQuestions: boolean[];
  imageBaseUrl: string;
  data: QuestionModel[];
  tempData: QuestionModel[];
  @Input() selectedTestSeriesId: any;
  @ViewChild(SearchfilterComponent) searchFilter: SearchfilterComponent;
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(QuestionpreviewComponent) previewQuestion: QuestionpreviewComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService,
              private testSeriesService: TestSeriesService) { }

  ngOnInit() {
    this.isDataPresent = false;
    this.imageBaseUrl = this.questionService.getImageUrl;
    this.id = 'questionassignment';
  }

  searchQuestion(event) {
    this.tempData = [];
    this.questionService.viewQuestion(this.searchFilter.searchCriteria)
      .subscribe(data => {
        this.testSeriesService.fetchTestSeriesQuestions(this.selectedTestSeriesId)
        .subscribe(aqData => {
          this.previewQuestion.data = JSON.parse(data);
          this.data = JSON.parse(aqData);
          for (let i = 0; i < this.previewQuestion.data.length; i++) {
            let isPresent = false;
            for (let j = 0; j < this.data.length; j++) {
              if (this.data[j].id === this.previewQuestion.data[i].id) {
                isPresent = true;
              }
            }
            if (!isPresent) {
              this.tempData.push(this.previewQuestion.data[i]);
            }
          }
          this.previewQuestion.data = this.tempData;
          // console.log(this.previewQuestion.data);
          this.previewQuestion.onChangeTable(this.previewQuestion.config);
          if (this.previewQuestion.data.length > 0) {
            this.selectedQuestions = [];
            for (let i = 0; i < this.previewQuestion.length; i++) {
              this.selectedQuestions.push(false);
            }
            this.isDataPresent = true;
          } else {
            this.isDataPresent = false;
            this.showNotification('No result for your criteria.', 'warning', 10000);
          }
        },
        error => {
          if (error.status === 401) {
            this.userService.logout();
          }
          this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
        });
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
      });
  }

  assignQuestions() {
    for (let i = 0; i < this.previewQuestion.testSeriesQuestionMaps.length; i++) {
      this.previewQuestion.testSeriesQuestionMaps[i].testSeriesId = this.selectedTestSeriesId;
    }
    this.testSeriesService.insertTestSeriesQuestionMapModels(this.previewQuestion.testSeriesQuestionMaps)
    .subscribe(data => {
      this.previewQuestion.testSeriesQuestionMaps = [];
      this.showNotification('Question Assigned to Test Series Successfully.', 'success', 2000);
    },
    error => {
      if (error.status === 401) {
        this.userService.logout();
      }
      this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
    });
  }

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

}
