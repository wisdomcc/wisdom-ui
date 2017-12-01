import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { AnswerModel } from '../../../../models/answer/answer.model';
import { LinkedAnswerModel } from '../../../../models/answer/answer.model';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { AnswerService } from '../../../../services/answer/answer.service';
import { QuestionService } from '../../../../services/question/question.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
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
  questionModels: QuestionModel[];
  isDataPresent: boolean;
  answerModels: AnswerModel[];
  modalRef: BsModalRef;
  @ViewChild(SearchfilterComponent) searchFilter: SearchfilterComponent;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private answerService: AnswerService,
              private questionService: QuestionService,
              private userService: UserService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.imageBaseUrl = this.questionService.getImageUrl;
    this.answerModels = [];
    this.hideSubmitPreviewButton = true;
    this.isDataPresent = false;
    this.id = 'submitanswer';
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
            let laModels = [];
            if (this.questionModels[i].linkedQuestions !== undefined) {
              for (let j = 0; j < this.questionModels[i].linkedQuestions.length; j++) {
                laModels.push(new LinkedAnswerModel(this.questionModels[i].linkedQuestions[j].id));
              }
            }
            this.answerModels.push(new AnswerModel(this.questionModels[i].id, laModels));
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

  validateAndOpenModal(template: TemplateRef<any>) {
    if (this.validateAnswerModels()) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
      this.modalRef = this.modalService.show(template);
    }
  }
 
  confirm(): void {
    this.submitAnswers();
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }

  submitAnswers() {
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

  validateAnswerModels(): boolean {
    let errorMsg = this.answerService.validate(this.answerModels);
    //console.log(this.answerModels);
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
