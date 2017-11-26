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
import { SearchResult } from '../../../../models/question/searchresult.model';

@Component({
  selector: 'app-questionassignment',
  templateUrl: './questionassignment.component.html',
  styleUrls: ['./questionassignment.component.css']
})
export class QuestionassignmentComponent implements OnInit {

  id: string;
  isDataPresent: boolean;
  selectedQuestions: boolean[];
  testSeriesModels: TestSeries[];
  selectedTestSeriesId: any;
  @ViewChild(SearchfilterComponent) searchFilter: SearchfilterComponent;
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(QuestionpreviewComponent) previewQuestion: QuestionpreviewComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService,
              private testSeriesService: TestSeriesService) { }

  ngOnInit() {
    this.selectedTestSeriesId = '';
    this.isDataPresent = false;
    this.id = 'questionassignment';
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

  searchQuestion(event) {
    this.searchFilter.searchCriteria.type = 'Test Series';
    this.questionService.viewQuestion(this.searchFilter.searchCriteria)
      .subscribe(data => {
        this.previewQuestion.data = JSON.parse(data);
        //console.log(this.previewQuestion.data);
        this.previewQuestion.onChangeTable(this.previewQuestion.config);
        if (this.previewQuestion.data.length > 0) {
          this.selectedQuestions = [];
          for(let i = 0; i < this.previewQuestion.length; i++) {
            this.selectedQuestions.push(false);
          }
          this.isDataPresent = true;
          this.notification.hideAlert = true;
        } else {
          this.isDataPresent = false;
          this.showNotification('No result for your criteria.', 'status');
        }
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some technical issue. Please try after sometime.', 'error');
      });
  }

  /*public getSearchResult(response: QuestionModel[]): Array<SearchResult> {
    const result = [];
    for (let i = 0; i < response.length; i++) {
      const searchresult = new SearchResult();
      /*if (response[i].question.indexOf('$') > 0) {
        searchresult.question = '<div id="mathjax">Q) ' + response[i].question + '<br/><br/>';
      } else {
        searchresult.question = 'Q) ' + response[i].question + '<br/><br/>';
      }//
      searchresult.question = 'Q) ' + response[i].question;
      if (response[i].options.type !== 'NoOption') {
        searchresult.options = [];
        for (let j = 0; j < response[i].options.option.length; j++) {
          searchresult.options.push((+j + 1) + ') ' + response[i].options.option[j]);
        }
      }
      /*if (response[i].question.indexOf('$') > 0) {
        searchresult.question = searchresult.question + '</div>';
      }//
      // MathJax.Hub.Queue([ 'Typeset', MathJax.Hub]);
      // MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, searchresult.question ]);
      searchresult.year = response[i].year;
      searchresult.marks = response[i].marks;
      result.push(searchresult);
    }
    return result;
  }*/

  assignQuestions() {
    for(let i = 0; i < this.previewQuestion.testSeriesQuestionMaps.length; i++) {
      this.previewQuestion.testSeriesQuestionMaps[i].testSeriesId = this.selectedTestSeriesId;
    };
    this.testSeriesService.insertTestSeriesQuestionMapModels(this.previewQuestion.testSeriesQuestionMaps)
    .subscribe(data => {
      this.previewQuestion.testSeriesQuestionMaps = [];
      this.showNotification('Question Assigned to Test Series Successfully.', 'success');
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
