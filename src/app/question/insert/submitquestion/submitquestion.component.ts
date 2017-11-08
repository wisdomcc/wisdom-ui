import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { QuestionModel } from '../../../../models/question/question.model';
import { QuestionElementProperty } from '../../../../models/question/qeproperty.model';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-submitquestion',
  templateUrl: './submitquestion.component.html',
  styleUrls: ['./submitquestion.component.css']
})

export class SubmitquestionComponent implements OnInit {

  id: string;
  hideSubmitPreviewButton: boolean;
  qeProperty: QuestionElementProperty[];
  questionModels: QuestionModel[];
  rightImagePath: string;
  downImagePath: string;
  category: any;
  isFirstTime = true;
  @ViewChild(NotificationComponent) notification: NotificationComponent;


  constructor(private questionService: QuestionService,
              private userService: UserService) {}

  ngOnInit() {
    this.hideSubmitPreviewButton = true;
    this.questionModels = [];
    this.qeProperty = [];
    this.rightImagePath = '../../assets/images/right.png';
    this.downImagePath = '../../assets/images/down.png';
    this.id = 'submitquestion';
  }

  addQuestion() {
    if (this.isFirstTime) {
      this.category = this.questionService.getCategoryDetails();
      // console.log(this.category);
      this.isFirstTime = false;
    }
    this.hideSubmitPreviewButton = false;
    const question = new QuestionModel();
    this.questionModels.push(question);
    this.qeProperty.push(new QuestionElementProperty(this.rightImagePath));
  }

  removeQuestion(index: number) {
    if (this.questionModels.length === 1) {
      this.hideSubmitPreviewButton = true;
    }
    this.questionModels.splice(index, 1);
    this.qeProperty.splice(index, 1);
  }

  expandCollapse(index: number) {
    this.qeProperty[index].collapse = this.qeProperty[index].collapse === true ? false : true;
    this.qeProperty[index].image = this.qeProperty[index].image === this.rightImagePath ? this.downImagePath : this.rightImagePath;
  }

  submitQuestions() {
    if (this.validateQuestionModels()) {
      this.questionService.insertQuestionModels(this.questionModels)
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
  }

  validateQuestionModels(): boolean {
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
