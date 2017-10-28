export class QuestionModel {
    id: any;
    question: string;
    images: Images;
    type: string;
    options: Options;
    hints: string;
    marks: string;
    year: string;
    relatedTo: RelatedTo;

    constructor() {
        this.id = Math.random().toString().slice(2, 12);
        this.images = new Images();
        this.options = new Options();
        this.relatedTo = new RelatedTo();
        this.type = 'Previous Year';
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
