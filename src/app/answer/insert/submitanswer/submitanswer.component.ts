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
import { SearchfilterComponent } from '../../../question/common/searchfilter/searchfilter.component';

@Component({
  selector: 'app-submitanswer',
  templateUrl: './submitanswer.component.html',
  styleUrls: ['./submitanswer.component.css']
})
export class SubmitanswerComponent implements OnInit {

  id: string;
  imageBaseUrl: string;
  hideSubmitPreviewButton: boolean;
  qeProperty: QuestionElementProperty[];
  questionModels: QuestionModel[];
  rightImagePath: string;
  downImagePath: string;
  isDataPresent: boolean;
  answerModels: AnswerModel[];
  @ViewChild(SearchfilterComponent) searchFilter: SearchfilterComponent;
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChildren(AnspreviewComponent) ansPreviews: QueryList<AnspreviewComponent>;

  constructor(private answerService: AnswerService,
              private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.imageBaseUrl = this.questionService.getImageUrl;
    this.answerModels = [];
    this.hideSubmitPreviewButton = true;
    this.isDataPresent = false;
    this.rightImagePath = '../../../../assets/images/right.png';
    this.downImagePath = '../../../../assets/images/down.png';
    this.id = 'submitanswer';
  }

  searchQuestion(event) {
    this.questionService.viewQuestion(this.searchFilter.searchCriteria)
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
