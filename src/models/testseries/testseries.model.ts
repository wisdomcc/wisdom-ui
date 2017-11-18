export class TestSeries {
    id: any;
    activateDate: any;
    deactivateDate: any;
    type: string;
    duration: string;
    exam: string;
    stream: string;
    subject: string;
    topic: string;
    noOfQuestion: string;

    constructor() {
        this.id = Math.random().toString().slice(2, 12);
    }
}

export class TestSeriesQuestionMap {
    id: any;
    testSeriesId: any;
    questionId: any;

    constructor(questionId: any) {
        this.id = Math.random().toString().slice(2, 12);
        this.questionId = questionId;
    }
}

export class TestSeriesEnrollment {
    id: any;
    testSeriesId: any;
    scheme: string;

    constructor(testSeriesId: any) {
        this.id = Math.random().toString().slice(2, 12);
        this.testSeriesId = testSeriesId;
        this.scheme = "Full Syllabus Test";
    }
}

export class TestSeriesAnswer {
    id: any;
    noOfTimesAnswerChanged: number;
    answer: string;
    questionId: any;
    testSeriesId: any;
    constructor(questionId: any) {
        this.id = Math.random().toString().slice(2, 12);
    }
}

export class TestSeriesResult {
    id: any;
    testSeriesId: any;
    weakTopic: string;
    strongTopic: string;
    weakSubject: string;
    strongSubject: string;
    accuracy: string;
    averageTime: string;
    confidence: string
    testSeriesDate: any;
}