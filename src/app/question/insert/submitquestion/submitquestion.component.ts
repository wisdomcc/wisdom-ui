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
    this.qeProperty.push(new QuestionElementProperty());
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
    for (let index = 0; index < this.questionModels.length; index++) {
      if (this.questionModels[index].question.trim() === '') {
        this.notification.showNotification('Question should not be empty. For QuestionId : '
         + this.questionModels[index].id, 'error', this.id);
        return false;
      }
      if (this.questionModels[index].options.type === 'Text' &&
         this.questionModels[index].options.option.length === 0) {
          this.notification.showNotification('Options Text is not added. For QuestionId : '
          + this.questionModels[index].id, 'error', this.id);
          return false;
      }
      if (this.questionModels[index].options.type === 'Image' &&
          this.questionModels[index].options.imagePath.length === 0) {
          this.notification.showNotification('Options Image is not added. For QuestionId : '
          + this.questionModels[index].id, 'error', this.id);
          return false;
      }
      if (this.questionModels[index].relatedTo.exam.length === 0) {
        this.notification.showNotification('Related To is not added. For QuestionId : '
        + this.questionModels[index].id, 'error', this.id);
        return false;
      }
      if (this.questionModels[index].marks.trim() === '') {
        this.notification.showNotification('Marks is not added. For QuestionId : '
        + this.questionModels[index].id, 'error', this.id);
        return false;
      }
      if (this.questionModels[index].year.trim() === '') {
        this.notification.showNotification('Year is not added. For QuestionId : '
        + this.questionModels[index].id, 'error', this.id);
        return false;
      }
      if (this.questionModels[index].linkedQuestions.length > 0) {
        for (let lindex = 0; lindex < this.questionModels[index].linkedQuestions.length; lindex++) {
          if (this.questionModels[index].linkedQuestions[lindex].question.trim() === '') {
            this.notification.showNotification('Question should not be empty. For Linked QuestionId : '
             + this.questionModels[index].linkedQuestions[lindex].id, 'error', this.id);
            return false;
          }
          if (this.questionModels[index].linkedQuestions[lindex].options.type === 'Text' &&
              this.questionModels[index].linkedQuestions[lindex].options.option.length === 0) {
              this.notification.showNotification('Options Text is not added. For Linked QuestionId : '
              + this.questionModels[index].linkedQuestions[lindex].id, 'error', this.id);
              return false;
          }
          if (this.questionModels[index].linkedQuestions[lindex].options.type === 'Image' &&
              this.questionModels[index].linkedQuestions[lindex].options.imagePath.length === 0) {
              this.notification.showNotification('Options Image is not added. For Linked QuestionId : '
              + this.questionModels[index].linkedQuestions[lindex].id, 'error', this.id);
              return false;
          }
          if (this.questionModels[index].linkedQuestions[lindex].marks.trim() === '') {
            this.notification.showNotification('Marks is not added. For Linked QuestionId : '
            + this.questionModels[index].linkedQuestions[lindex].id, 'error', this.id);
            return false;
          }
        }
      }
    }
    return true;
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}
