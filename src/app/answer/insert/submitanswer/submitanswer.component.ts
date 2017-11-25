import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { AnswerModel } from '../../../../models/answer/answer.model';
import { LinkedAnswerModel } from '../../../../models/answer/answer.model';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { QuestionElementProperty } from '../../../../models/question/qeproperty.model';
import { AnswerService } from '../../../../services/answer/answer.service';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { NotificationComponent } from '../../../common/notification/notification.component';
import { AnspreviewComponent } from '../anspreview/anspreview.component';

@Component({
  selector: 'app-submitanswer',
  templateUrl: './submitanswer.component.html',
  styleUrls: ['./submitanswer.component.css']
})
export class SubmitanswerComponent implements OnInit {

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
  answerModels: AnswerModel[];
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChildren(AnspreviewComponent) ansPreviews: QueryList<AnspreviewComponent>;

  constructor(private answerService: AnswerService,
              private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.answerModels = [];
    this.hideSubmitPreviewButton = true;
    this.searchCriteria = new SearchCriteria();
    this.isDataPresent = false;
    this.rightImagePath = '../../../../assets/images/right.png';
    this.downImagePath = '../../../../assets/images/down.png';
    this.id = 'submitanswer';
    this.subjects = ['Select Subject'];
    this.topics = ['Select Topic'];
    this.fromYears = [];
    for (let year = 1991; year < (new Date()).getFullYear(); year++) {
      this.fromYears.push(year);
    }
    this.categoryData = JSON.parse(localStorage.getItem("categoryData"));
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
    console.log('Search Criteria : ' + JSON.stringify(this.searchCriteria));
    this.questionService.viewQuestion(this.searchCriteria)
    .subscribe(
      data => {
        this.questionModels = JSON.parse(data);
        if (this.questionModels.length > 0) {
          this.isDataPresent = true;
          this.qeProperty = [];
          this.hideSubmitPreviewButton = false;
          for (let i = 0; i < this.questionModels.length; i++) {
            let laModels = [];
            if (this.questionModels[i].linkedQuestions !== undefined) {
              for (let j = 0; j < this.questionModels[i].linkedQuestions.length; j++) {
                laModels.push(new LinkedAnswerModel(this.questionModels[i].linkedQuestions[j].id));
              }
            }
            this.answerModels.push(new AnswerModel(this.questionModels[i].id, laModels));
            this.qeProperty.push(new QuestionElementProperty(this.rightImagePath));
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

  removeAnswer(index: number) {
    if (this.questionModels.length === 1) {
      this.hideSubmitPreviewButton = true;
    }
    console.log('qid:' + this.questionModels[index].id + '#aqid:' + this.answerModels[index].questionId);
    this.questionModels.splice(index, 1);
    this.answerModels.splice(index, 1);
    this.qeProperty.splice(index, 1);
  }

  submitAnswers() {
    if (this.validateAnswerModels()) {
      // console.log(this.answerModels);
      this.answerService.insertAnswerModels(this.answerModels)
      .subscribe(
        data => {
          this.showNotification('Answers inserted successfully in database.', 'success');
          this.hideSubmitPreviewButton = true;
          this.questionModels = [];
          this.answerModels = [];
          this.qeProperty = [];
        },
        error => {
          if (error.status === 401) {
            this.userService.logout();
          }
          this.showNotification('Some error occured while inserting answers in database. Please retry.', 'error');
        }
      );
    }
  }

  validateAnswerModels(): boolean {
    let errorMsg = '';
    console.log(this.answerModels);
    this.answerModels.forEach(function(answerModel) {
      if (answerModel.answer === '') {
        errorMsg = 'No Option selected or answer provided. For QuestionId : ' + answerModel.questionId;
        return;
      }
      if (answerModel.explanation.description === '') {
        errorMsg = 'No explanation for answer provided. For QuestionId : ' + answerModel.questionId;
        return;
      }
      answerModel.linkedAnswers.forEach(function(linkedAnswerModel) {
        if (linkedAnswerModel.answer === '') {
          errorMsg = 'No Option selected or answer provided. For linked question of QuestionId : ' + answerModel.questionId;
          return;
        }
        if (linkedAnswerModel.explanation.description === '') {
          errorMsg = 'No explanation for answer provided. For linked question of QuestionId : ' + answerModel.questionId;
          return;
        }
      });
    });
    if (errorMsg !== '') {
      this.notification.showNotification(errorMsg, 'error', this.id);
      errorMsg = '';
      return false;
    }
    return true;
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}
