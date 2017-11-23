import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
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
  searchId: string;
  searchCriteria: SearchCriteria;
  categoryData: any;
  selectedSubject: string;
  selectedTopic: string;
  subjects: string[];
  topics: string[];
  fromYears: number[];
  toYears: number[];
  isDataPresent: boolean;
  selectedQuestions: boolean[];
  testSeriesModels: TestSeries[];
  selectedTestSeriesId: any;
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(QuestionpreviewComponent) previewQuestion: QuestionpreviewComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService,
              private testSeriesService: TestSeriesService) { }

  ngOnInit() {
    this.selectedTestSeriesId = '';
    this.searchCriteria = new SearchCriteria();
    this.isDataPresent = false;
    this.id = 'questionassignment';
    this.searchId = 'questionassignmentsearch';
    this.subjects = ['Select Subject'];
    this.topics = ['Select Topic'];
    this.fromYears = [];
    for (let year = 1991; year < (new Date()).getFullYear(); year++) {
      this.fromYears.push(year);
    }
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

  getToYears() {
    this.toYears = [];
    const startYear = +this.searchCriteria.fromYear + 1;
    for (let year = startYear; year < (new Date()).getFullYear(); year++) {
      this.toYears.push(year);
    }
  }

  getSubjects() {
    if (this.categoryData === undefined) {
      this.categoryData = this.questionService.getCategoryDetails();
      for (let i = 0; i < this.categoryData.exams.length; i++) {
        if ('Gate' === this.categoryData.exams[i].exam) {
          for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
            if ('CS' === this.categoryData.exams[i].streams[j].stream) {
              for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
                this.subjects.push(this.categoryData.exams[i].streams[j].subjects[k].subject);
              }
              break;
            }
          }
        }
      }
    }
  }

  getTopics() {
    this.clearTopics();
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if ('Gate' === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if ('CS' === this.categoryData.exams[i].streams[j].stream) {
            for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
              if (this.selectedSubject === this.categoryData.exams[i].streams[j].subjects[k].subject) {
                for (let l = 0; l < this.categoryData.exams[i].streams[j].subjects[k].topics.length; l++) {
                  this.topics.push(this.categoryData.exams[i].streams[j].subjects[k].topics[l].topic);
                }
                break;
              }
            }
          }
        }
      }
    }
  }

  clearTopics() {
    const length = this.topics.length;
    this.selectedTopic = 'Select Topic';
    if (this.topics.length > 0) {
      for (let i = 0; i < length; i++) {
        this.topics.pop();
      }
    }
    this.topics.push('Select Topic');
  }

  viewQuestion() {
    if (this.selectedSubject !== undefined) {
      if (this.selectedSubject !== 'Select Subject') {
        this.searchCriteria.relatedTo.subject.pop();
        this.searchCriteria.relatedTo.subject.push(this.selectedSubject);
      } else {
        this.searchCriteria.relatedTo.subject.pop();
      }
    }
    if (this.selectedTopic !== undefined) {
      if (this.selectedTopic !== 'Select Topic') {
        this.searchCriteria.relatedTo.topic.pop();
        this.searchCriteria.relatedTo.topic.push(this.selectedTopic);
      } else {
        this.searchCriteria.relatedTo.topic.pop();
      }
    }
    this.searchCriteria.type = 'Test Series';
    this.questionService.viewQuestion(this.searchCriteria)
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
        } else {
          this.showSearchNotification('No result for your criteria.', 'status');
        }
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showSearchNotification('Some technical issue. Please try after sometime.', 'error');
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
    if(this.selectedTestSeriesId === undefined) {
      this.showNotification('Test Series should not be empty', 'error');
      return;
    }
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

  showSearchNotification(msg: string, type: string) {
    debugger;
    this.notification.showNotification(msg, type, this.searchId);
  }


  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}

