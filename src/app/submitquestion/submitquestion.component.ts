import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { QuestionModel } from '../../models/question.model';
import { NotificationComponent } from '../notification/notification.component';


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


  constructor(private dataService: DataService) {}

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
      this.category = this.dataService.getCategoryDetails();
      console.log(this.category);
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
    this.dataService.insertQuestionModels(this);
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}

export class QuestionElementProperty {
  image: string;
  collapse: boolean;

  constructor() {
    this.image = '../../assets/images/right.png';
    this.collapse = true;
  }
}
