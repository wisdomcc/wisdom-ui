import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { AnswerModel } from '../../../../models/answer/answer.model';

@Component({
  selector: 'app-anspreview',
  templateUrl: './anspreview.component.html',
  styleUrls: ['./anspreview.component.css']
})
export class AnspreviewComponent implements OnInit {

  @Input() questionModel: QuestionModel;
  @Input() answerModel: AnswerModel;
  @Input() imageBaseUrl: string;

  constructor() { }

  ngOnInit() {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.question ]);
    if (this.questionModel.options.type !== 'NoOption') {
      for (let i = 0; i < this.questionModel.options.option.length; i++) {
        MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.options.option[i] ]);
      }
    }
  }

  markAnswer(option: string) {
    this.answerModel.answer = 'option' + option;
  }

  markLinkedAnswer(option: string, index: number) {
    this.answerModel.linkedAnswers[index].answer = 'option' + option;
  }

  getCheckedStatus(index: number) {
    if (this.answerModel.answer === ('option' + index)) {
      return true;
    }
    return false;
  }

  getLinkedCheckedStatus(pindex: number, index: number) {
    if (this.answerModel.linkedAnswers[pindex].answer === ('option' + index)) {
      return true;
    }
    return false;
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

}

