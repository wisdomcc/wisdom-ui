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
  linkedAnswerModels: AnswerModel[];

  constructor() { }

  ngOnInit() {
    if (this.questionModel.linkedQuestions !== undefined) {
      this.linkedAnswerModels = [];
      for (let i = 0; i < this.questionModel.linkedQuestions.length; i++) {
        this.linkedAnswerModels.push(new AnswerModel(this.questionModel.linkedQuestions[i].id));
      }
    }
  }

  markAnswer(option: string) {
    this.answerModel.answer = 'option' + option;
  }

  markLinkedAnswer(option: string, index: number) {
    this.linkedAnswerModels[index].answer = 'option' + option;
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
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.answerModel.explanation.description ]);
    if (this.questionModel.options.type !== 'NoOption') {
      for (let i = 0; i < this.questionModel.options.option.length; i++) {
        MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.options.option[i] ]);
      }
    }
  }

}

