import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { UtilityService } from '../../../../services/utility/utility.service';
import { QuestionModel } from '../../../../models/question/question.model';
import { LinkedQuestionModel } from '../../../../models/question/question.model';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-linkedquestion',
  templateUrl: './linkedquestion.component.html',
  styleUrls: ['./linkedquestion.component.css']
})

export class LinkedquestionComponent implements OnInit {

  @Input() isUpdateSearch: boolean;
  @Input() questionModel: QuestionModel;

  constructor() {}

  ngOnInit() {}

  addQuestion() {
    const question = new LinkedQuestionModel(this.questionModel.id);
    this.questionModel.linkedQuestions.push(question);
  }

  removeQuestion(index: number) {
    this.questionModel.linkedQuestions.splice(index, 1);
  }

}

