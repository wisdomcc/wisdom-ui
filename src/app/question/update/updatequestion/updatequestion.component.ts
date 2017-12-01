import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SearchfilterComponent } from '../../../question/common/searchfilter/searchfilter.component';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { UtilityService } from '../../../../services/utility/utility.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent implements OnInit {

  id: string;
  hideSubmitPreviewButton: boolean;
  questionModels: QuestionModel[];
  isDataPresent: boolean;
  modalRef: BsModalRef;
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(SearchfilterComponent) searchFilter: SearchfilterComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService,
              private utilityService: UtilityService,
              private modalService: BsModalService) { }

  ngOnInit() {
    this.id = 'updatequestion';
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

  validateQuestionModels(): boolean {
    let errorMsg = this.questionService.validate(this.questionModels);
    if (errorMsg !== '') {
      this.notification.showNotification(errorMsg, 'danger', 5000);
      errorMsg = '';
      return false;
    }
    return true;
  }

  getDataFromLocalStorage() {
    if(this.utilityService.getStringDataFromLocalStorage('page') === this.id) {
      this.questionModels = this.utilityService.getJsonDataFromLocalStorage('questionModels');
      this.hideSubmitPreviewButton = this.utilityService.getBooleanDataFromLocalStorage('hideSubmitPreviewButton');
      this.isDataPresent = this.utilityService.getBooleanDataFromLocalStorage('isDataPresent');
    } else {
      this.removeDataFromLocalStorage();
      this.questionModels = [];
      this.hideSubmitPreviewButton = true;
      this.isDataPresent = false;
    }
  }

  removeDataFromLocalStorage() {
    let keys: string[] = [];
    keys.push('questionModels');
    keys.push('hideSubmitPreviewButton');
    keys.push('isDataPresent');
    this.utilityService.removeMultipleDataFromLocalStorage(keys);
  }

  searchQuestion(event) {
    this.questionService.viewQuestion(this.searchFilter.searchCriteria)
    .subscribe(
      data => {
        this.questionModels = JSON.parse(data);
        if (this.questionModels.length > 0) {
          this.isDataPresent = true;
          this.hideSubmitPreviewButton = false;
          this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
          this.utilityService.setBooleanDataToLocalStorage('isDataPresent', this.isDataPresent);
          this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
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

  removeQuestion(index: number) {
    if (this.questionModels.length === 1) {
      this.hideSubmitPreviewButton = true;
    }
    this.questionModels.splice(index, 1);
    this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
    this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
  }

  submitQuestions() {
    this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
    this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
    this.questionService.updateQuestionModels(this.questionModels)
    .subscribe(
      data => {
        this.showNotification('Questions updated successfully in database.', 'success', 2000);
        this.hideSubmitPreviewButton = true;
        this.questionModels = [];
        this.isDataPresent = false;
        this.removeDataFromLocalStorage();
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some error occured while updating questions in database. Please retry.', 'danger', 5000);
      }
    );
  }

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

}
