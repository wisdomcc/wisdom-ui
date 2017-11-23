import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { TestSeriesAnswer } from '../../../../models/testseries/testseries.model';
import { TestSeriesLinkedAnswer } from '../../../../models/testseries/testseries.model';
import { TestSeriesStatus } from '../../../../models/testseries/testseries.model';
import { TestSeries } from '../../../../models/testseries/testseries.model';
import { QuestionStatus } from '../../../../models/testseries/testseries.model';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { UserService } from '../../../../services/user/user.service';
import { QuestionService } from '../../../../services/question/question.service';
import { TestSeriesService } from '../../../../services/testseries/testseries.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-testseries',
  templateUrl: './testseries.component.html',
  styleUrls: ['./testseries.component.css']
})
export class TestseriesComponent implements OnInit {

  public rows: Array<QuestionModel> = [];
  public columns: Array<any> = [
    {title: 'Question', width: 10, name: 'question'}
  ];
  public page = 1;
  public itemsPerPage = 1;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  public answerModels: TestSeriesAnswer[];
  public testSeriesStatus: TestSeriesStatus;
  public questionStatus: QuestionStatus[];
  public data: QuestionModel[];
  public searchCriteria: SearchCriteria;
  public id: string;
  public isTestStarted: boolean;
  public testSeriesModels: TestSeries[]; 
  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService,
              private testSeriesService: TestSeriesService) { }
   
  public ngOnInit(): void {
    this.id = "testseries";
    this.isTestStarted = false;
    this.searchCriteria = new SearchCriteria();
    this.fetchEnrolledTestSeriesDetails();
  }

  fetchEnrolledTestSeriesDetails() {
    this.testSeriesService.fetchEnrolledTestSeriesModels()
    .subscribe(tsdata => {
      this.testSeriesModels = JSON.parse(tsdata);
      if(this.testSeriesModels.length === 0) {
        this.showNotification("Not enrolled. Please enroll to test series.", "status");
      }
    },
    error => {
      if (error.status === 401) {
        this.userService.logout();
      }
      this.showNotification('Some technical issue. Please try after sometime.', 'error');
    });
  }

  startTest(testSeriesId: any) {
    let totalQuestions = 0;
    //this.questionService.viewQuestion(this.searchCriteria)
    this.testSeriesService.fetchTestSeriesQuestions(testSeriesId)
    .subscribe(data => {
      this.data = JSON.parse(data);
      if(this.data.length > 0) {
        totalQuestions = this.data.length;
        this.questionStatus = [];
        this.answerModels = [];
        for(let i = 0; i < this.data.length; i++) {
          this.questionStatus.push(new QuestionStatus(this.data[i].id));
          this.answerModels.push(new TestSeriesAnswer(this.data[i].id, testSeriesId));
          if(this.data[i].linkedQuestions !== undefined) {
            totalQuestions = totalQuestions + this.data[i].linkedQuestions.length;
            for(let j = 0; j < this.data[i].linkedQuestions.length; j++) {
              this.questionStatus[i].linkedQuestionsStatus.push(new QuestionStatus(this.data[i].linkedQuestions[j].id));
              this.answerModels[i].linkedAnswers.push(new TestSeriesLinkedAnswer(this.answerModels[i].id, this.data[i].linkedQuestions[j].id));
            }
          }
        }
      }
      this.testSeriesStatus = new TestSeriesStatus(this.questionStatus, totalQuestions);
      console.log(this.answerModels);
      console.log(this.testSeriesStatus);
      this.onChangeTable(this.config);
    },
    error => {
      if (error.status === 401) {
        this.userService.logout();
      }
      this.showNotification('Some technical issue. Please try after sometime.', 'error');
    });
    this.onChangeTable(this.config);
    this.isTestStarted = true;
  }

  submitTestSeries() {
    this.testSeriesService.submitTestSeries(this.answerModels)
      .subscribe(
        data => {
        this.isTestStarted = false;
        this.showNotification('Answers submitted successfully. Please visit result link to view result analysis.', 'status');
        },
        error => {
          if (error.status === 401) {
            this.userService.logout();
          }
          this.showNotification('Some technical issue. Please try after sometime.', 'error');
        }
      );
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

  checkActivationDate(activationDate: string) {
    const todayDate = new Date();
    const date = new Date(activationDate);
    if(todayDate > date) {
      return false;
    }
    return true;
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    if (data !== undefined && data.length > 0) {
      const start = (page.page - 1) * page.itemsPerPage;
      const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }
    return data;
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    const sortedData = this.data;
    if (sortedData !== undefined && sortedData.length > 0) {
      for (let i = 0; i < sortedData.length; i++) {
        MathJax.Hub.Queue(['Typeset', MathJax.Hub, sortedData[i].question]);
      }
      if (config.name) {
        this.rows = page ?  this.changePage(page, sortedData) : sortedData;
      } else {
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
      }
      this.length = sortedData.length;
    }
  }

  public onCellClick(rows: QuestionModel[]) {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
  }

}

