import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { QuestionElementProperty } from '../../../../models/question/qeproperty.model';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent implements OnInit {

  id: string;
  hideSubmitPreviewButton: boolean;
  qeProperty: QuestionElementProperty[];
  questionModels: QuestionModel[];
  rightImagePath: string;
  downImagePath: string;
  searchCriteria: SearchCriteria;
  categoryData: any;
  selectedSubject: string;
  selectedTopic: string;
  subjects: string[];
  topics: string[];
  fromYears: number[];
  toYears: number[];
  isDataPresent: boolean;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.hideSubmitPreviewButton = true;
    this.searchCriteria = new SearchCriteria();
    this.isDataPresent = false;
    this.rightImagePath = '../../assets/images/right.png';
    this.downImagePath = '../../assets/images/down.png';
    this.id = 'updatequestion';
    this.subjects = ['Select Subject'];
    this.topics = ['Select Topic'];
    this.fromYears = [];
    for (let year = 1991; year < (new Date()).getFullYear(); year++) {
      this.fromYears.push(year);
    }
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
    if (this.categoryData === undefined) {
      this.categoryData = this.questionService.getCategoryDetails();
    }
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
    this.questionService.viewQuestion(this.searchCriteria)
    .subscribe(
      data => {
        this.questionModels = JSON.parse(data);
        if (this.questionModels.length > 0) {
          this.isDataPresent = true;
          this.qeProperty = [];
          this.hideSubmitPreviewButton = false;
          for (let i = 0; i < data.length; i++) {
            this.qeProperty.push(new QuestionElementProperty());
          }
        } else {
          this.showNotification('No result for your criteria.', 'status');
        }
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some technical issue. Please try after sometime.', 'error');
      }
    );
  }

  expandCollapse(index: number) {
    this.qeProperty[index].collapse = this.qeProperty[index].collapse === true ? false : true;
    this.qeProperty[index].image = this.qeProperty[index].image === this.rightImagePath ? this.downImagePath : this.rightImagePath;
  }

  removeQuestion(index: number) {
    if (this.questionModels.length === 1) {
      this.hideSubmitPreviewButton = true;
    }
    this.questionModels.splice(index, 1);
    this.qeProperty.splice(index, 1);
  }

  submitQuestions() {
    this.questionService.updateQuestionModels(this.questionModels)
    .subscribe(
      data => {
        this.showNotification('Questions inserted successfully in database.', 'success');
        this.hideSubmitPreviewButton = true;
        this.questionModels = [];
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some error oaccured while inserting questions in database. Please retry.', 'error');
      }
    );
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}
