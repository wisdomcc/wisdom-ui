import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';

@Component({
  selector: 'app-previewtemplate',
  templateUrl: './previewtemplate.component.html',
  styleUrls: ['./previewtemplate.component.css']
})
export class PreviewtemplateComponent implements OnInit {

  @Input() imageBaseUrl: string;
  @Input() isSubmitPreview: boolean;
  @Input() questionModel: QuestionModel;
  constructor() { }

  ngOnInit() {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.question ]);
    if (this.questionModel.options.type !== 'NoOption') {
      for (let i = 0; i < this.questionModel.options.option.length; i++) {
        MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.options.option[i] ]);
      }
    }
  }

}
