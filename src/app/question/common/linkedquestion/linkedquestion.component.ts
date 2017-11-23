import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { QuestionModel } from '../../../../models/question/question.model';
import { LinkedQuestionModel } from '../../../../models/question/question.model';
import { QuestionElementProperty } from '../../../../models/question/qeproperty.model';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-linkedquestion',
  templateUrl: './linkedquestion.component.html',
  styleUrls: ['./linkedquestion.component.css']
})

export class LinkedquestionComponent implements OnInit {

  isLinkedQuestion: boolean;
  @Input() isUpdateSearch: boolean;
  qeProperty: QuestionElementProperty[];
  @Input() questionModel: QuestionModel;
  rightImagePath: string;
  downImagePath: string;

  constructor(private questionService: QuestionService,
              private userService: UserService) {}

  ngOnInit() {
    this.isLinkedQuestion = true;
    // console.log('update search : ' + this.isUpdateSearch);
    this.getDataFromSessionStorage();
    if (this.isUpdateSearch && this.questionModel.linkedQuestions !== undefined) {
      for (let i = 0; i < this.questionModel.linkedQuestions.length; i++) {
        this.qeProperty.push(new QuestionElementProperty(this.rightImagePath));
      }
    }
    this.rightImagePath = '../../assets/images/right.png';
    this.downImagePath = '../../assets/images/down.png';
  }

  addQuestion() {
    const question = new LinkedQuestionModel(this.questionModel.id);
    this.questionModel.linkedQuestions.push(question);
    this.qeProperty.push(new QuestionElementProperty(this.rightImagePath));
  }

  removeQuestion(index: number) {
    this.questionModel.linkedQuestions.splice(index, 1);
    this.qeProperty.splice(index, 1);
    this.setDataIntoSessionStorage();
  }

  expandCollapse(index: number) {
    this.qeProperty[index].collapse = this.qeProperty[index].collapse === true ? false : true;
    this.qeProperty[index].image = this.qeProperty[index].image === this.rightImagePath ? this.downImagePath : this.rightImagePath;
    this.setDataIntoSessionStorage();
  }

  getDataFromSessionStorage() {
    if(sessionStorage.getItem("linkedQeProperty")) {
      this.qeProperty = JSON.parse(sessionStorage.getItem("linkedQeProperty"));
    } else {
      this.qeProperty = [];
    }
  }

  setDataIntoSessionStorage() {
    sessionStorage.setItem("linkedQeProperty", JSON.stringify(this.qeProperty));
  }

}

