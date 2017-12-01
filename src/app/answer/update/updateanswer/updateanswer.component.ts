import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { AnswerModel } from '../../../../models/answer/answer.model';
import { LinkedAnswerModel } from '../../../../models/answer/answer.model';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { AnswerService } from '../../../../services/answer/answer.service';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { NotificationComponent } from '../../../common/notification/notification.component';
import { AnspreviewComponent } from '../../insert/anspreview/anspreview.component';
import { SearchfilterComponent } from '../../../question/common/searchfilter/searchfilter.component';

@Component({
  selector: 'app-updateanswer',
  templateUrl: './updateanswer.component.html',
  styleUrls: ['./updateanswer.component.css']
})
export class UpdateanswerComponent implements OnInit {

  id: string;
  hideSubmitPreviewButton: boolean;
  questionModels: QuestionModel[];
  isDataPresent: boolean;
  answerModels: AnswerModel[];
  imageBaseUrl: string;
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
    this.id = 'updateanswer';
  }

  searchQuestion(event) {
    this.questionService.viewQuestion(this.searchFilter.searchCriteria)
    .subscribe(
      data => {
        this.questionModels = JSON.parse(data);
        if (this.questionModels.length > 0) {
          this.isDataPresent = true;
          this.hideSubmitPreviewButton = false;
          for (let i = 0; i < this.questionModels.length; i++) {
            if (this.questionModels[i].answer !== undefined) {
              let laModels = [];
              if (this.questionModels[i].linkedQuestions !== undefined) {
                for (let j = 0; j < this.questionModels[i].linkedQuestions.length; j++) {
                  if (this.questionModels[i].linkedQuestions[j].answer !== undefined) {
                    laModels.push(this.questionModels[i].linkedQuestions[j].answer);
                  } else {
                    laModels.push(new LinkedAnswerModel(this.questionModels[i].linkedQuestions[j].id));
                  }
                }
              }
              this.questionModels[i].answer.linkedAnswers = laModels;
              this.answerModels.push(this.questionModels[i].answer);
            } else {
              let laModels = [];
              if (this.questionModels[i].linkedQuestions !== undefined) {
                for (let j = 0; j < this.questionModels[i].linkedQuestions.length; j++) {
                  laModels.push(new LinkedAnswerModel(this.questionModels[i].linkedQuestions[j].id));
                }
              }
              this.answerModels.push(new AnswerModel(this.questionModels[i].id, laModels));
            }
          }
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
      }
    );
  }

  removeAnswer(index: number) {
    if (this.questionModels.length === 1) {
      this.hideSubmitPreviewButton = true;
    }
    //console.log('qid:' + this.questionModels[index].id + '#aqid:' + this.answerModels[index].questionId);
    this.questionModels.splice(index, 1);
    this.answerModels.splice(index, 1);
  }

  submitAnswers() {
    if (this.validateAnswerModels()) {
      // console.log(this.answerModels);
      this.answerService.insertAnswerModels(this.answerModels)
      .subscribe(
        data => {
          this.showNotification('Answers inserted successfully in database.', 'success', 2000);
          this.hideSubmitPreviewButton = true;
          this.questionModels = [];
          this.answerModels = [];
        },
        error => {
          if (error.status === 401) {
            this.userService.logout();
          }
          this.showNotification('Some error occured while inserting answers in database. Please retry.', 'danger', 5000);
        }
      );
    }
  }

  validateAnswerModels(): boolean {
    let errorMsg = '';
    //console.log(this.answerModels.length);
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

