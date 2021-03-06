import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})
export class AttributeComponent implements OnInit {

  @Input() questionModel: QuestionModel;
  @Input() isLinkedQuestion: boolean;
  types: string[];
  constructor() { }

  ngOnInit() {
    this.types = ['Previous Year', 'Test Series', 'Normal'];
  }

  isNormalType() {
    if (this.questionModel.type === 'Normal') {
      return true;
    }
    return false;
  }

}
