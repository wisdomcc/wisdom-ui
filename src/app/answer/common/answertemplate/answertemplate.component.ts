import { Component, OnInit, Input } from '@angular/core';
import { AnswerModel } from '../../../../models/answer/answer.model';

@Component({
  selector: 'app-answertemplate',
  templateUrl: './answertemplate.component.html',
  styleUrls: ['./answertemplate.component.css']
})
export class AnswertemplateComponent implements OnInit {

  @Input() imageBaseUrl: string;
  @Input() answerModel: AnswerModel;
  constructor() { }

  ngOnInit() {
  }

}
