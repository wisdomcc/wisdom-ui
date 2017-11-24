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
  searchId: string;
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
    this.id = 'updatequestion';
    this.searchId = "updatequestionsearch"
    this.getDataFromlocalStorage();
    localStorage.setItem("page", this.id);
    this.searchCriteria = new SearchCriteria();
    this.rightImagePath = '../../assets/images/right.png';
    this.downImagePath = '../../assets/images/down.png';
    this.searchId = 'updatequestionsearch';
    this.subjects = ['Select Subject'];
    this.topics = ['Select Topic'];
    this.fromYears = [];
    for (let year = 1991; year < (new Date()).getFullYear(); year++) {
      this.fromYears.push(year);
    }
    this.categoryData = JSON.parse(localStorage.getItem('categoryData'));
  }

  getDataFromlocalStorage() {
    if(localStorage.getItem("page") !== "undefined" && localStorage.getItem("page") === this.id) {
      if(localStorage.getItem("questionModels") !== "undefined") {
        this.questionModels = JSON.parse(localStorage.getItem("questionModels"));
      } else {
        this.questionModels = [];
      }
      if(localStorage.getItem("qeProperty") !== "undefined") {
        this.qeProperty = JSON.parse(localStorage.getItem("qeProperty"));
      } else {
        this.qeProperty = [];
      }
      this.hideSubmitPreviewButton = true;
      if(localStorage.getItem("hideSubmitPreviewButton") !== "undefined") {
        if(localStorage.getItem("hideSubmitPreviewButton") === 'true') {
          this.hideSubmitPreviewButton = true;
        } else {
          this.hideSubmitPreviewButton = false;
        }
      }
      this.isDataPresent = false;
      if(localStorage.getItem("isDataPresent") !== "undefined") {
        if(localStorage.getItem("isDataPresent") === 'true') {
          this.isDataPresent = true;
        } else {
          this.isDataPresent = false;
        }
      }
    } else {
      this.questionModels = [];
      this.qeProperty = [];
      this.hideSubmitPreviewButton = true;
      this.isDataPresent = false;
    }
  }

  setDataIntolocalStorage() {
    localStorage.setItem("questionModels", JSON.stringify(this.questionModels));
    localStorage.setItem("qeProperty", JSON.stringify(this.qeProperty));
    if(this.hideSubmitPreviewButton) {
      localStorage.setItem('hideSubmitPreviewButton', 'true');
    } else {
      localStorage.setItem('hideSubmitPreviewButton', 'false');
    }
    if(this.isDataPresent) {
      localStorage.setItem('isDataPresent', 'true');
    } else {
      localStorage.setItem('isDataPresent', 'false');
    }
  }

  removeItemFromlocalStorage() {
    localStorage.removeItem("questionModels");
    localStorage.removeItem("qeProperty");
    localStorage.removeItem("hideSubmitPreviewButton");
    localStorage.removeItem("linkedQeProperty");
    localStorage.removeItem("isDataPresent");
  }

  getToYears() {
    this.toYears = [];
    const startYear = +this.searchCriteria.fromYear + 1;
    for (let year = startYear; year < (new Date()).getFullYear(); year++) {
      this.toYears.push(year);
    }
  }

  getSubjects() {
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
    this.questionService.viewQuestion(this.searchCriteria)
    .subscribe(
      data => {
        this.questionModels = JSON.parse(data);
        if (this.questionModels.length > 0) {
          this.isDataPresent = true;
          this.qeProperty = [];
          this.hideSubmitPreviewButton = false;
          for (let i = 0; i < data.length; i++) {
            this.qeProperty.push(new QuestionElementProperty(this.rightImagePath));
          }
          this.setDataIntolocalStorage();
        } else {
          this.showSearchNotification('No result for your criteria.', 'status');
        }
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showSearchNotification('Some technical issue. Please try after sometime.', 'error');
      }
    );
  }

  expandCollapse(index: number) {
    this.qeProperty[index].collapse = this.qeProperty[index].collapse === true ? false : true;
    this.qeProperty[index].image = this.qeProperty[index].image === this.rightImagePath ? this.downImagePath : this.rightImagePath;
    this.setDataIntolocalStorage();
  }

  removeQuestion(index: number) {
    if (this.questionModels.length === 1) {
      this.hideSubmitPreviewButton = true;
    }
    this.questionModels.splice(index, 1);
    this.qeProperty.splice(index, 1);
    this.setDataIntolocalStorage();
  }

  submitQuestions() {
    this.questionService.updateQuestionModels(this.questionModels)
    .subscribe(
      data => {
        this.showNotification('Questions inserted successfully in database.', 'success');
        this.hideSubmitPreviewButton = true;
        this.questionModels = [];
        this.qeProperty = [];
        this.isDataPresent = false;
        this.removeItemFromlocalStorage();
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

  showSearchNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.searchId);
  }

}
