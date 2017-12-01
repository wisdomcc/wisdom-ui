import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { UtilityService } from '../../../../services/utility/utility.service';
import { QuestionModel } from '../../../../models/question/question.model';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-submitquestion',
  templateUrl: './submitquestion.component.html',
  styleUrls: ['./submitquestion.component.css']
})

export class SubmitquestionComponent implements OnInit {

  id: string;
  imageBaseUrl: string;
  hideSubmitPreviewButton: boolean;
  questionModels: QuestionModel[];
  categoryData: any;

  modalRef: BsModalRef;

  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService,
              private utilityService: UtilityService,
              private modalService: BsModalService) {}

  ngOnInit() {
    this.id = 'submitquestion';
    this.imageBaseUrl = this.questionService.getImageUrl;
    this.getDataFromLocalStorage();
    this.utilityService.setStringDataToLocalStorage('page', this.id);
  }

  validateAndOpenModal(template: TemplateRef<any>) {
    this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
    this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
    if (this.validateQuestionModels()) {
      MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
      this.modalRef = this.modalService.show(template);
    }
  }
 
  confirm(): void {
    this.submitQuestions();
    this.modalRef.hide();
  }
 
  decline(): void {
    this.modalRef.hide();
  }

  getDataFromLocalStorage() {
    this.categoryData = this.utilityService.getJsonDataFromLocalStorage('categoryData');
    if(this.utilityService.getStringDataFromLocalStorage('page') === this.id) {
      this.questionModels = this.utilityService.getJsonDataFromLocalStorage('questionModels');
      this.hideSubmitPreviewButton = this.utilityService.getBooleanDataFromLocalStorage('hideSubmitPreviewButton');
    } else {
      this.removeDataFromLocalStorage();
      this.questionModels = [];
      this.hideSubmitPreviewButton = true;
      this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
    }
  }

  addQuestion() {
    this.hideSubmitPreviewButton = false;
    const question = new QuestionModel();
    this.questionModels.push(question);
    this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
  }

  removeDataFromLocalStorage() {
    let keys: string[] = [];
    keys.push('questionModels');
    keys.push('hideSubmitPreviewButton');
    this.utilityService.removeMultipleDataFromLocalStorage(keys);
  }

  removeQuestion(index: number) {
    if (this.questionModels.length === 1) {
      this.hideSubmitPreviewButton = true;
      this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
    }
    this.questionModels.splice(index, 1);
    this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
  }

  submitQuestions() {
    this.questionService.insertQuestionModels(this.questionModels)
    .subscribe(
      data => {
        this.showNotification('Questions inserted successfully in database.', 'success', 2000);
        this.hideSubmitPreviewButton = true;
        this.questionModels = [];
        this.removeDataFromLocalStorage();
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some error occured while inserting questions in database. Please retry.', 'danger', 5000);
      }
    );
  }

  validateQuestionModels(): boolean {
    let errorMsg = this.questionService.validate(this.questionModels);
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
