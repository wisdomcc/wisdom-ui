import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { PreviewComponent } from '../preview/preview.component';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @ViewChild(PreviewComponent) preview: PreviewComponent;

  @Input() questionModel: QuestionModel;
  @Input() isLinkedQuestion: boolean;
  @Input() isUpdateSearch: boolean;
  @Input() imageBaseUrl: string;

  ngOnInit() {
  }

}
