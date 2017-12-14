import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionModel } from '../../../../models/question/question.model';
import { TestSeriesAnswer } from '../../../../models/testseries/testseries.model';
import { TestSeriesLinkedAnswer } from '../../../../models/testseries/testseries.model';
import { TestSeriesStatus } from '../../../../models/testseries/testseries.model';
import { TestSeriesEnrollmentStatus } from '../../../../models/testseries/testseries.model';
import { TestSeriesEnrollment } from '../../../../models/testseries/testseries.model';
import { QuestionStatus } from '../../../../models/testseries/testseries.model';
import { UserService } from '../../../../services/user/user.service';
import { UtilityService } from '../../../../services/utility/utility.service';
import { QuestionService } from '../../../../services/question/question.service';
import { TestSeriesService } from '../../../../services/testseries/testseries.service';
import { NotificationComponent } from '../../../common/notification/notification.component';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { WisdomtimerComponent } from '../../../timer/wisdomtimer/wisdomtimer.component';

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
  public previousPage = 1;
  public itemsPerPage = 1;
  public maxSize = 5;
  public numPages = 1;
  public length = 0;
  public startTime = 0;
  public enrollTestSeriesUrl = '/enrolltestseries';
  public answerModels: TestSeriesAnswer[];
  public testSeriesStatus: TestSeriesStatus;
  public questionStatus: QuestionStatus[];
  public data: QuestionModel[];
  public id: string;
  public enrollmentId: any;
  public testSeriesId: any;
  public imageBaseUrl: string;
  public isTestStarted: boolean;
  public isEnrolledForTestSeries: boolean;
  public testSeriesEnrollmentModels: TestSeriesEnrollmentStatus[];
  public examDuration: number;
  public config:
   any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };
  @ViewChild(WisdomtimerComponent) wisdomTimer: WisdomtimerComponent;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService,
              private testSeriesService: TestSeriesService,
              private utilityService: UtilityService,
              private router: Router) { }

  public ngOnInit(): void {
    this.id = 'testseries';
    this.imageBaseUrl = this.questionService.getImageUrl;
    this.isTestStarted = false;
    this.isEnrolledForTestSeries = true;
    if (this.utilityService.getBooleanDataFromLocalStorage('isEnrolledForTestSeries')) {
      if (this.utilityService.getBooleanDataFromLocalStorage('isTestStarted')) {
        this.isTestStarted = true;
        this.page = this.utilityService.getIntDataFromLocalStorage('pageNo');
        this.previousPage = this.utilityService.getIntDataFromLocalStorage('pageNo');
        this.data = this.utilityService.getJsonDataFromLocalStorage('data');
        this.answerModels = this.utilityService.getJsonDataFromLocalStorage('answerModels');
        this.testSeriesStatus = this.utilityService.getJsonDataFromLocalStorage('testSeriesStatus');
        this.examDuration = this.utilityService.getIntDataFromLocalStorage('examDuration');
        this.onChangeTable(this.config);
      } else {
        this.testSeriesEnrollmentModels = this.utilityService.getJsonDataFromLocalStorage('testSeriesEnrollmentModels');
      }
    } else {
      this.fetchEnrolledTestSeriesDetails();
    }
  }

  removeDataFromLocalStorage() {
    const keys: string[] = [];
    keys.push('data');
    keys.push('pageNo');
    keys.push('answerModels');
    keys.push('testSeriesEnrollmentModels');
    keys.push('testSeriesStatus');
    keys.push('isTestStarted');
    keys.push('isEnrolledForTestSeries');
    this.utilityService.removeMultipleDataFromLocalStorage(keys);
  }

  fetchEnrolledTestSeriesDetails() {
    this.testSeriesService.fetchEnrolledTestSeriesModels()
    .subscribe(tsdata => {
      this.testSeriesEnrollmentModels = JSON.parse(tsdata);
      if (this.testSeriesEnrollmentModels.length === 0) {
        this.isEnrolledForTestSeries = false;
      }
      this.utilityService.setJsonDataToLocalStorage('testSeriesEnrollmentModels', this.testSeriesEnrollmentModels);
      this.utilityService.setBooleanDataToLocalStorage('isEnrolledForTestSeries', this.isEnrolledForTestSeries);
    },
    error => {
      if (error.status === 401) {
        this.userService.logout();
      }
      this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
    });
  }

  enrollTestSeries() {
    this.router.navigateByUrl(this.enrollTestSeriesUrl);
  }

  startTest(testSeries: TestSeriesEnrollmentStatus) {
    let totalQuestions = 0;
    this.enrollmentId = testSeries.enrollmentId;
    this.testSeriesId = testSeries.id;
    this.testSeriesService.fetchTestSeriesQuestions(testSeries.id)
    .subscribe(data => {
      this.data = JSON.parse(data);
      if (this.data.length > 0) {
        this.examDuration = parseInt(testSeries.duration, 10) * 60 * 1000;
        totalQuestions = this.data.length;
        this.questionStatus = [];
        this.answerModels = [];
        for (let i = 0; i < this.data.length; i++) {
          this.questionStatus.push(new QuestionStatus(this.data[i].id));
          this.answerModels.push(new TestSeriesAnswer(this.data[i].id, testSeries.id));
          if (this.data[i].linkedQuestions !== undefined) {
            totalQuestions = totalQuestions + this.data[i].linkedQuestions.length;
            for (let j = 0; j < this.data[i].linkedQuestions.length; j++) {
              this.questionStatus[i].linkedQuestionsStatus.push(new QuestionStatus(this.data[i].linkedQuestions[j].id));
              this.answerModels[i].linkedAnswers.push(
                new TestSeriesLinkedAnswer(this.answerModels[i].id, this.data[i].linkedQuestions[j].id));
            }
          }
        }
        this.testSeriesStatus = new TestSeriesStatus(this.questionStatus, totalQuestions);
        this.isTestStarted = true;
        this.utilityService.setBooleanDataToLocalStorage('isTestStarted', this.isTestStarted);
        this.utilityService.setJsonDataToLocalStorage('data', this.data);
        this.utilityService.setJsonDataToLocalStorage('answerModels', this.answerModels);
        this.utilityService.setJsonDataToLocalStorage('testSeriesStatus', this.testSeriesStatus);
        this.onChangeTable(this.config);
        this.changeEnrollmentStatus('Resume Test', parseInt(testSeries.duration, 10) * 60 * 1000);
      } else {
        this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
      }
    },
    error => {
      if (error.status === 401) {
        this.userService.logout();
      }
      this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
    });
  }

  resumeTest(testSeries: TestSeriesEnrollmentStatus) {
    let totalQuestions = 0;
    let attempted = 0;
    this.enrollmentId = testSeries.enrollmentId;
    this.testSeriesId = testSeries.id;
    this.testSeriesService.fetchTestSeriesQuestions(testSeries.id)
    .subscribe(data => {
      this.data = JSON.parse(data);
      if (this.data.length > 0) {
        this.examDuration = testSeries.remainingExamDuration;
        totalQuestions = this.data.length;
        this.questionStatus = [];
        this.answerModels = [];
        this.testSeriesService.fetchTestSeriesAnswerModels(testSeries.id)
          .subscribe(tsaData => {
            let answerModels: TestSeriesAnswer[];
            answerModels = JSON.parse(tsaData);
            for (let i = 0; i < this.data.length; i++) {
              for (let j = 0; j < answerModels.length; j++) {
                if (answerModels[j].questionId === this.data[i].id) {
                  // below value are set because in parsing JSON 0 is eliminated.
                  if (!answerModels[j].timeSpend) {
                    answerModels[j].timeSpend = 0;
                  }
                  if (!answerModels[j].noOfTimesAnswerChanged) {
                    answerModels[j].noOfTimesAnswerChanged = 0;
                  }
                  this.answerModels.push(answerModels[j]);
                  this.questionStatus.push(new QuestionStatus(answerModels[j].questionId));
                  if (answerModels[j].answer !== undefined && answerModels[j].answer !== null) {
                    // console.log(answerModels[j].answer);
                    this.questionStatus[i].setStatus('A');
                    this.questionStatus[i].setColor('text-success');
                    attempted = attempted + 1;
                  }
                  if (answerModels[j].linkedAnswers !== undefined) {
                    totalQuestions = totalQuestions + answerModels[j].linkedAnswers.length;
                    for (let k = 0; k < answerModels[j].linkedAnswers.length; k++) {
                      if (!answerModels[j].linkedAnswers[k].timeSpend) {
                        answerModels[j].linkedAnswers[k].timeSpend = 0;
                      }
                      if (!answerModels[j].linkedAnswers[k].noOfTimesAnswerChanged) {
                        answerModels[j].linkedAnswers[k].noOfTimesAnswerChanged = 0;
                      }
                      this.questionStatus[i].linkedQuestionsStatus.push(
                        new QuestionStatus(answerModels[j].linkedAnswers[k].questionId));
                      if (answerModels[j].linkedAnswers[k].answer !== undefined && answerModels[j].linkedAnswers[k].answer !== null) {
                        this.questionStatus[i].linkedQuestionsStatus[k].setStatus('A');
                        this.questionStatus[i].linkedQuestionsStatus[k].setColor('text-success');
                        attempted = attempted + 1;
                      }
                    }
                  }
                  break;
                }
              }
            }
            this.testSeriesStatus = new TestSeriesStatus(this.questionStatus, totalQuestions);
            this.testSeriesStatus.setAttempted(attempted);
            this.testSeriesStatus.setUnattempted(totalQuestions - attempted);
            this.isTestStarted = true;
            this.utilityService.setBooleanDataToLocalStorage('isTestStarted', this.isTestStarted);
            this.utilityService.setJsonDataToLocalStorage('data', this.data);
            this.utilityService.setJsonDataToLocalStorage('answerModels', this.answerModels);
            this.utilityService.setJsonDataToLocalStorage('testSeriesStatus', this.testSeriesStatus);
            this.utilityService.setIntDataToLocalStorage('examDuration', this.examDuration);
            this.onChangeTable(this.config);
          },
          error => {
            if (error.status === 401) {
              this.userService.logout();
            }
            this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
          });
      } else {
        this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
      }
    },
    error => {
      if (error.status === 401) {
        this.userService.logout();
      }
      this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
    });
  }

  resultAnalysis(testSeries: TestSeriesEnrollmentStatus) {
    this.router.navigateByUrl('/testseriesresult');
  }

  changeEnrollmentStatus(status: string, remainingExamDuration: number) {
    if (this.testSeriesId !== undefined && this.enrollmentId !== undefined) {
      if (this.testSeriesEnrollmentModels !== undefined) {
        for ( let i = 0; i < this.testSeriesEnrollmentModels.length; i++) {
          if (this.testSeriesEnrollmentModels[i].id === this.testSeriesId) {
            this.testSeriesEnrollmentModels[i].testSeriesStatus = status;
            break;
          }
        }
      }
      const testSeriesEnrollments = [];
      const testSeriesEnrollment = new TestSeriesEnrollment(this.testSeriesId, status, remainingExamDuration);
      testSeriesEnrollment.setId(this.enrollmentId);
      testSeriesEnrollments.push(testSeriesEnrollment);
      this.testSeriesService.enrollTestSeries(testSeriesEnrollments)
        .subscribe(tsdata => {
            if (tsdata) {
            }
        },
        error => {
          if (error.status === 401) {
            this.userService.logout();
          }
        });
    }
  }

  submitTestSeries(event) {
    this.testSeriesService.submitTestSeries(this.answerModels)
      .subscribe(
        data => {
          this.isTestStarted = false;
          this.removeDataFromLocalStorage();
          this.showNotification('Answers submitted successfully. Please visit result link to view result analysis.', 'warning', 10000);
          this.changeEnrollmentStatus('Result Analysis', 0);
        },
        error => {
          if (error.status === 401) {
            this.userService.logout();
          }
          this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
        }
      );
  }

  goToTestList(page: number) {
    this.isTestStarted = false;
    this.utilityService.setBooleanDataToLocalStorage('isTestStarted', this.isTestStarted);
    this.utilityService.setIntDataToLocalStorage('pageNo', page);
    this.utilityService.setJsonDataToLocalStorage('answerModels', this.answerModels);
    this.utilityService.setJsonDataToLocalStorage('testSeriesStatus', this.testSeriesStatus);
  }

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

  checkActivationDate(activationDate: string) {
    const todayDate = new Date();
    const date = new Date(activationDate);
    if (todayDate > date) {
      return false;
    }
    return true;
  }

  public changePage(page: any, data: Array<any> = this.data): Array<any> {
    this.utilityService.setIntDataToLocalStorage('pageNo', page.page);
    this.utilityService.setJsonDataToLocalStorage('testSeriesStatus', this.testSeriesStatus);
    if (this.wisdomTimer !== undefined) {
      this.utilityService.setIntDataToLocalStorage('examDuration', this.wisdomTimer.examDuration);
    } else {
      this.utilityService.setIntDataToLocalStorage('examDuration', this.examDuration);
    }
    if (this.previousPage !== page.page) {
      this.answerModels[this.previousPage - 1].timeSpend = this.answerModels[this.previousPage - 1].timeSpend
      + (this.startTime - this.utilityService.getIntDataFromLocalStorage('examDuration'));
      console.log('time Spend : ' + this.answerModels[this.previousPage - 1].timeSpend);
      this.previousPage = page.page;
      this.startTime = this.utilityService.getIntDataFromLocalStorage('examDuration');
    } else {
      this.startTime = this.utilityService.getIntDataFromLocalStorage('examDuration');
    }
    this.submitAnswerModels();
    this.changeEnrollmentStatus('Resume Test', this.utilityService.getIntDataFromLocalStorage('examDuration'));
    if (data !== null && data !== undefined && data.length > 0) {
      const start = (page.page - 1) * page.itemsPerPage;
      const end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
      return data.slice(start, end);
    }
    return data;
  }


  public changePageTo(pageNo) {
    this.page = pageNo;
    this.onChangeTable(this.config);
  }

  submitAnswerModels() {
    this.testSeriesService.submitTestSeries(this.answerModels)
    .subscribe(
      data => {
        this.utilityService.setJsonDataToLocalStorage('answerModels', this.answerModels);
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
      }
    );
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    const sortedData = this.data;
    if (sortedData !== null && sortedData !== undefined && sortedData.length > 0) {
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
