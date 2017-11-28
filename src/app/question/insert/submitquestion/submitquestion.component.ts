import { Component, OnInit, ViewChild } from '@angular/core';
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
  hideSubmitPreviewButton: boolean;
  questionModels: QuestionModel[];
  categoryData: any;
  isFirstTime = true;
  @ViewChild(NotificationComponent) notification: NotificationComponent;


  constructor(private questionService: QuestionService,
              private userService: UserService,
              private utilityService: UtilityService) {}

  ngOnInit() {
    this.id = 'submitquestion';
    this.getDataFromLocalStorage();
    this.utilityService.setStringDataToLocalStorage('page', this.id);
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
    this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
    this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
    if (this.validateQuestionModels()) {
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
  }

  validateQuestionModels(): boolean {
    debugger;
    let errorMsg = '';
    this.questionModels.forEach(function(question) {
      if (question.question.trim() === '') {
        errorMsg = 'Question should not be empty. For QuestionId : ' + question.id;
        return;
      }
      if (question.options.type === 'Text' &&
         question.options.option.length === 0) {
          errorMsg = 'Options Text is not added. For QuestionId : ' + question.id;
          return;
      }
      if (question.options.type === 'Image' &&
          question.options.imagePath.length === 0) {
          errorMsg = 'Options Image is not added. For QuestionId : ' + question.id;
          return;
      }
      if (question.relatedTo.exam.length === 0) {
        errorMsg = 'Related To is not added. For QuestionId : ' + question.id;
        return;
      }
      if (question.marks.trim() === '') {
        errorMsg = 'Marks is not added. For QuestionId : ' + question.id;
        return;
      }
      if (question.year.trim() === '') {
        errorMsg = 'Year is not added. For QuestionId : ' + question.id;
        return;
      }
      question.linkedQuestions.forEach(function(linkedQuestion) {
        if (linkedQuestion.question.trim() === '') {
          errorMsg = 'Question should not be empty. For Linked QuestionId : ' + linkedQuestion.id;
          return;
        }
        if (linkedQuestion.options.type === 'Text' &&
            linkedQuestion.options.option.length === 0) {
            errorMsg = 'Options Text is not added. For Linked QuestionId : ' + linkedQuestion.id;
            return;
        }
        if (linkedQuestion.options.type === 'Image' &&
            linkedQuestion.options.imagePath.length === 0) {
            errorMsg = 'Options Image is not added. For Linked QuestionId : ' + linkedQuestion.id;
            return;
        }
        if (linkedQuestion.marks.trim() === '') {
          errorMsg = 'Marks is not added. For Linked QuestionId : ' + linkedQuestion.id;
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
