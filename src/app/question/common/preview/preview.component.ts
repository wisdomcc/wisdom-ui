import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  @Input() questionModel: QuestionModel;
  @Input() isLinkedQuestion: boolean;
  @Input() imageBaseUrl: string;
  qpreview: any;
  qoptions: any[];

  constructor() { }

  ngOnInit() {
  }

  isImageAvailable() {
    if (this.questionModel.images.paths !== undefined && this.questionModel.images.paths.length > 0) {
      return true;
    }
    return false;
  }

  isParaImageAvailable() {
    if (this.questionModel.paragraph.images.paths !== undefined && this.questionModel.paragraph.images.paths.length > 0) {
      return true;
    }
    return false;
  }

  previewQuestion() {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.question ]);
    if (this.questionModel.options.type !== 'NoOption') {
      for (let i = 0; i < this.questionModel.options.option.length; i++) {
        MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.options.option[i] ]);
      }
    }
  }

}
