import { Component, OnInit, ViewChild } from '@angular/core';
import { TestSeries } from '../../../../models/testseries/testseries.model';
import { QuestionService } from '../../../../services/question/question.service';
import { TestSeriesService } from '../../../../services/testseries/testseries.service';
import { UserService } from '../../../../services/user/user.service';
import { UtilityService } from '../../../../services/utility/utility.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-submittestseries',
  templateUrl: './submittestseries.component.html',
  styleUrls: ['./submittestseries.component.css']
})
export class SubmittestseriesComponent implements OnInit {

  id: string;
  minDate: Date;
  hideSubmitPreviewButton: boolean;
  testSeriesModels: TestSeries[];
  types = ['Subject Wise', 'Topic Wise', 'Syllabus Wise'];
  selectedExam: string;
  selectedStream: string;
  selectedSubject: string;
  selectedTopic: string;
  selectedSubTopic: string;
  streams: string[];
  subjects: string[];
  topics: string[];
  categoryData: any;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService, 
              private testSeriesService: TestSeriesService,
              private userService: UserService,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.id = 'submittestseries';
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.streams = [];
    this.subjects = [];
    this.topics = [];
    this.testSeriesModels = [];
    this.hideSubmitPreviewButton = true;
    this.categoryData = this.utilityService.getJsonDataFromLocalStorage('categoryData');
  }

  addTestSeries() {
    this.hideSubmitPreviewButton = false;
    const question = new TestSeries();
    this.testSeriesModels.push(question);
  }

  removeTestSeries(index: number) {
    if (this.testSeriesModels.length === 1) {
      this.hideSubmitPreviewButton = true;
    }
    this.testSeriesModels.splice(index, 1);
  }

  getStreams(index: number) {
    this.selectedExam = this.testSeriesModels[index].exam;
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          this.streams.push(this.categoryData.exams[i].streams[j].stream);
        }
        break;
      }
    }
  }

  getSubjects(index: number) {
    this.selectedStream = this.testSeriesModels[index].stream;
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if (this.selectedStream === this.categoryData.exams[i].streams[j].stream) {
            for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
              this.subjects.push(this.categoryData.exams[i].streams[j].subjects[k].subject);
            }
            break;
          }
        }
      }
    }
  }

  getTopics(index: number) {
    this.selectedSubject = this.testSeriesModels[index].subject;
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if (this.selectedStream === this.categoryData.exams[i].streams[j].stream) {
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

  submitTestSeries() {
    if (this.validateTestSeriesModels()) {
      this.testSeriesService.insertTestSeriesModels(this.testSeriesModels)
      .subscribe(
        data => {
          this.showNotification('Test Series inserted successfully in database.', 'success', 2000);
          this.hideSubmitPreviewButton = true;
          this.testSeriesModels = [];
        },
        error => {
          if (error.status === 401) {
            this.userService.logout();
          }
          this.showNotification('Some error occured while inserting questions in database. Please retry.', 'danger', 5000);
        }
      );
    }
  }

  validateTestSeriesModels() {
    let errorMsg = '';
    this.testSeriesModels.forEach(function(testSeries) {
      if (testSeries.activateDate === undefined) {
        errorMsg = 'Test Series activate Date should not be empty. For Test Series Id : ' + testSeries.id;
        return;
      }
      if (testSeries.deactivateDate === undefined) {
        errorMsg = 'Test Series deactivate Date should not be empty. For Test Series Id : ' + testSeries.id;
        return;
      }
      if (testSeries.duration === undefined || testSeries.duration === '') {
        errorMsg = 'Duration should not be empty. For Test Series Id : ' + testSeries.id;
        return;
      }
      if (testSeries.noOfQuestion === undefined || testSeries.noOfQuestion === '') {
        errorMsg = 'No of Question should not be empty. For Test Series Id : ' + testSeries.id;
        return;
      }
      if (testSeries.type === undefined) {
        errorMsg = 'Test Series Type should not be empty. For Test Series Id : ' + testSeries.id;
        return;
      }
      if (testSeries.exam === undefined) {
        errorMsg = 'Exam should not be empty. For Test Series Id : ' + testSeries.id;
        return;
      }
      if (testSeries.stream === undefined) {
        errorMsg = 'Stream should not be empty. For Test Series Id : ' + testSeries.id;
        return;
      }
    });
    if (errorMsg !== '') {
      this.notification.showNotification(errorMsg, 'danger', 5000);
      errorMsg = '';
      return false;
    }
    return true;
  }

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

}
