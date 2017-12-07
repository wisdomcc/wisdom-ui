import { Component, OnInit, Input } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { AnswerModel } from '../../../../models/answer/answer.model';

@Component({
  selector: 'app-previewtemplate',
  templateUrl: './previewtemplate.component.html',
  styleUrls: ['./previewtemplate.component.css']
})
export class PreviewtemplateComponent implements OnInit {

  @Input() imageBaseUrl: string;
  @Input() isSubmitPreview: boolean;
  @Input() isAnswerPreview: boolean;
  @Input() questionModel: QuestionModel;
  @Input() answerModel: AnswerModel;
  constructor() { }

  isSelected(index: number) {
    const option = 'option' + (index + 1);
    if (this.answerModel.answer === option) {
      return true;
    }
    return false;
  }

  isLinkedSelected(pIndex: number, index: number) {
    debugger;
    const option = 'option' + (index + 1);
    if (this.answerModel.linkedAnswers[pIndex].answer === option) {
      return true;
    }
    return false;
  }

  ngOnInit() {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.question ]);
    if (this.questionModel.options.type !== 'NoOption') {
      for (let i = 0; i < this.questionModel.options.option.length; i++) {
        MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.options.option[i] ]);
      }
    }
  }

}
