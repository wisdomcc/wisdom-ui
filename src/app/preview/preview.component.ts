import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { QuestionModel } from '../../models/question.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() questionModel: QuestionModel;
  @Input() index: number;
  qpreview: any;
  qoptions: any[];

  constructor() { }

  ngOnInit() {
  }

  isImageAvailable() {
    if ( this.questionModel.images.paths.length > 0) {
      return true;
    }
    return false;
  }

  previewQuestion() {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.question ]);
    for (let i = 0; i < this.questionModel.options.option.length; i++) {
      MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.options.option[i] ]);
    }
  }

}
