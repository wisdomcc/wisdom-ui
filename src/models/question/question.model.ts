import { AnswerModel } from '../answer/answer.model';

export class QuestionModel {
    id: any;
    question: string;
    paragraph: Paragraph;
    images: Images;
    type: string;
    options: Options;
    hints: string;
    marks: string;
    year: string;
    relatedTo: RelatedTo;
    answer: AnswerModel;
    linkedQuestions: LinkedQuestionModel[];

    constructor() {
        this.id = Math.random().toString().slice(2, 12);
        this.question = '';
        this.paragraph = new Paragraph(this.id);
        this.images = new Images();
        this.options = new Options();
        this.relatedTo = new RelatedTo();
        this.linkedQuestions = [];
        this.type = 'Previous Year';
        this.marks = '';
        this.year = '';
    }
}

export class LinkedQuestionModel {
    id: any;
    parentQuestionId: any;
    question: string;
    images: Images;
    options: Options;
    hints: string;
    marks: string;
    answer: AnswerModel;

    constructor(parentId: any) {
        this.id = Math.random().toString().slice(2, 12);
        this.parentQuestionId = parentId;
        this.images = new Images();
        this.options = new Options();
        this.marks = '';
        this.question = '';
    }
}

class RelatedTo {
    exam: string[];
    stream: string[];
    subject: string[];
    topic: string[];
    subTopic: string[];
    tags: string[];

    constructor() {
        this.exam = [];
        this.stream = [];
        this.subject = [];
        this.subTopic = [];
        this.tags = [];
        this.topic = [];
    }
}
class Images {
    paths: string[];

    constructor() {
        this.paths = [];
    }
}
class Options {
    type: string;
    option: string[];
    imagePath: string[];

    constructor() {
    this.type = 'Text';
    this.option = [];
    this.imagePath = [];
    }
}
class Paragraph {
    id: any;
    questionId: any;
    paragraph: string;
    images: Images;

    constructor(questionId: any) {
        this.id = Math.random().toString().slice(2, 12);
        this.questionId = questionId;
        this.images = new Images();
    }
}

export class Category {
    exam: string;
	stream: string;
	subject: string;
	topic: string;
    subtopic: string;
    
    constructor() {
    }
}