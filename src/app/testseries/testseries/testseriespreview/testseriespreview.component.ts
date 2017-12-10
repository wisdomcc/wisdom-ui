import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { TestSeriesAnswer, QuestionStatus } from '../../../../models/testseries/testseries.model';
import { TestSeriesStatus } from '../../../../models/testseries/testseries.model';

@Component({
  selector: 'app-testseriespreview',
  templateUrl: './testseriespreview.component.html',
  styleUrls: ['./testseriespreview.component.css']
})
export class TestseriespreviewComponent implements OnInit {

  @Input() questionModel: QuestionModel;
  @Input() answerModel: TestSeriesAnswer;
  @Input() testSeriesStatus: TestSeriesStatus;
  @Input() qIndex: number;
  @Input() imageBaseUrl: string;

  constructor() { }

  ngOnInit() {
    // console.log(this.answerModel);
  }

  changeAnswerStatus() {
    if (this.answerModel.answer !== undefined) {
      if (this.answerModel.answer !== '') {
        this.answerModel.noOfTimesAnswerChanged = this.answerModel.noOfTimesAnswerChanged + 1;
        this.changeStatusToAttempted(this.testSeriesStatus.questionStatus[this.qIndex]);
      } else {
        this.changeStatusToUnAttempted(this.testSeriesStatus.questionStatus[this.qIndex]);
      }
    }
  }

  changeLinkedAnswerStatus(index: number) {
    if (this.answerModel.linkedAnswers[index].answer !== undefined) {
      if (this.answerModel.linkedAnswers[index].answer !== '') {
        this.answerModel.linkedAnswers[index].noOfTimesAnswerChanged = this.answerModel.linkedAnswers[index].noOfTimesAnswerChanged + 1;
        this.changeStatusToAttempted(this.testSeriesStatus.questionStatus[this.qIndex].linkedQuestionsStatus[index]);
      } else {
        this.changeStatusToUnAttempted(this.testSeriesStatus.questionStatus[this.qIndex].linkedQuestionsStatus[index]);
      }
    }
  }

  changeStatusToAttempted(questionStatus: QuestionStatus) {
    if (questionStatus.status !== 'A') {
      this.testSeriesStatus.attempted = this.testSeriesStatus.attempted + 1;
      this.testSeriesStatus.unattempted = this.testSeriesStatus.unattempted - 1;
    }
    questionStatus.status = 'A';
    questionStatus.color = 'text-success';
  }

  changeStatusToUnAttempted(questionStatus: QuestionStatus) {
    if (questionStatus.status !== 'UA') {
      this.testSeriesStatus.attempted = this.testSeriesStatus.attempted - 1;
      this.testSeriesStatus.unattempted = this.testSeriesStatus.unattempted + 1;
    }
    questionStatus.status = 'UA';
    questionStatus.color = 'text-danger';
  }

  markAnswer(option: string) {
    if (this.answerModel.answer !== undefined) {
      this.answerModel.noOfTimesAnswerChanged = this.answerModel.noOfTimesAnswerChanged + 1;
    }
    this.answerModel.answer = 'option' + option;
    this.changeStatusToAttempted(this.testSeriesStatus.questionStatus[this.qIndex]);
  }

  markLinkedAnswer(option: string, index: number) {
    if (this.answerModel.linkedAnswers[index] !== undefined) {
      this.answerModel.linkedAnswers[index].noOfTimesAnswerChanged = this.answerModel.linkedAnswers[index].noOfTimesAnswerChanged + 1;
    }
    this.answerModel.linkedAnswers[index].answer = 'option' + option;
    this.changeStatusToAttempted(this.testSeriesStatus.questionStatus[this.qIndex].linkedQuestionsStatus[index]);
  }

  markAnswerInDoubt() {
    this.testSeriesStatus.questionStatus[this.qIndex].status = 'D';
    this.testSeriesStatus.questionStatus[this.qIndex].color = 'text-info';
    this.testSeriesStatus.indoubt = this.testSeriesStatus.indoubt + 1;
  }

  markLinkedAnswerInDoubt(index: number) {
    this.testSeriesStatus.questionStatus[this.qIndex].linkedQuestionsStatus[index].status = 'D';
    this.testSeriesStatus.questionStatus[this.qIndex].linkedQuestionsStatus[index].color = 'text-info';
    this.testSeriesStatus.indoubt = this.testSeriesStatus.indoubt + 1;
  }

  clearAnswer() {
    this.answerModel.answer = undefined;
    this.changeStatusToUnAttempted(this.testSeriesStatus.questionStatus[this.qIndex]);
  }

  clearLinkedAnswer(index: number) {
    this.answerModel.linkedAnswers[index].answer = undefined;
    this.changeStatusToUnAttempted(this.testSeriesStatus.questionStatus[this.qIndex].linkedQuestionsStatus[index]);
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

  previewQuestion() {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.question ]);
    if (this.questionModel.options.type !== 'NoOption') {
      for (let i = 0; i < this.questionModel.options.option.length; i++) {
        MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.questionModel.options.option[i] ]);
      }
    }
  }

}
