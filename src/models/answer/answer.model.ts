export class AnswerModel {
    id: any;
    questionId: any;
    answer: string;
    explanation: Explanation;
    linkedAnswers: LinkedAnswerModel[];

    constructor(questionId: any, linkedAnswers: AnswerModel[]) {
        this.id = Math.random().toString().slice(2, 12);
        this.questionId = questionId;
        this.answer = '';
        this.explanation = new Explanation();
        this.linkedAnswers = linkedAnswers;
    }
}
export class LinkedAnswerModel {
    id: any;
    questionId: any;
    answer: string;
    explanation: Explanation;

    constructor(questionId: any) {
        this.id = Math.random().toString().slice(2, 12);
        this.questionId = questionId;
        this.answer = '';
        this.explanation = new Explanation();
    }
}

class Explanation {
    description: string;
    imagePath: string[];

    constructor() {
        this.description = '';
        this.imagePath = [];
    }
}
