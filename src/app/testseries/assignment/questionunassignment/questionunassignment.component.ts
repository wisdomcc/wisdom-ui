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
  selector: 'app-questionunassignment',
  templateUrl: './questionunassignment.component.html',
  styleUrls: ['./questionunassignment.component.css']
})
export class QuestionunassignmentComponent implements OnInit {

  id: string;
  isDataPresent: boolean;
  selectedQuestions: boolean[];
  @Input() imageBaseUrl: string;
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
    this.id = 'questionunassignment';
    this.searchAssignedQuestion();
  }

  searchAssignedQuestion() {
    this.testSeriesService.fetchTestSeriesQuestions(this.selectedTestSeriesId)
      .subscribe(data => {
        this.previewQuestion.data = JSON.parse(data);
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
  }

  unassignQuestions() {
    for (let i = 0; i < this.previewQuestion.testSeriesQuestionMaps.length; i++) {
      this.previewQuestion.testSeriesQuestionMaps[i].testSeriesId = this.selectedTestSeriesId;
    }
    this.testSeriesService.deleteTestSeriesQuestionMapModels(this.previewQuestion.testSeriesQuestionMaps)
    .subscribe(data => {
      this.previewQuestion.testSeriesQuestionMaps = [];
      this.showNotification('Question Un-Assigned from Test Series Successfully.', 'success', 2000);
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

