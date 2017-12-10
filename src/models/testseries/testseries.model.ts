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

export class TestSeriesEnrollmentStatus {
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
    testSeriesStatus: string;
    remainingExamDuration: number;
    enrollmentId: any;

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
    testSeriesStatus: string;
    remainingExamDuration: number;

    constructor(testSeriesId: any, status: string, remainingExamDuration: number) {
        this.id = Math.random().toString().slice(2, 12);
        this.testSeriesId = testSeriesId;
        this.scheme = 'Full Syllabus Test';
        this.testSeriesStatus = status;
        this.remainingExamDuration = remainingExamDuration;
    }

    setId(id: any) {
        this.id = id;
    }
}

export class TestSeriesAnswer {
    id: any;
    timeSpend: number;
    noOfTimesAnswerChanged: number;
    answer: string;
    questionId: any;
    testSeriesId: any;
    linkedAnswers: TestSeriesLinkedAnswer[];
    constructor(questionId: any, testSeriesId: any) {
        this.id = Math.random().toString().slice(2, 12);
        this.questionId = questionId;
        this.testSeriesId = testSeriesId;
        this.linkedAnswers = [];
        this.noOfTimesAnswerChanged = 0;
    }
}

export class TestSeriesLinkedAnswer {
    id: any;
    timeSpend: number;
    noOfTimesAnswerChanged: number;
    answer: string;
    questionId: any;
    parentAnswerId: any;
    constructor(parentAnswerId: any, questionId: any) {
        this.id = Math.random().toString().slice(2, 12);
        this.questionId = questionId;
        this.parentAnswerId = parentAnswerId;
        this.noOfTimesAnswerChanged = 0;
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
    confidence: string;
    testSeriesDate: any;
}

export class TestSeriesStatus {

    attempted: number;
    unattempted: number;
    indoubt: number;
    questionStatus: QuestionStatus[];

    constructor(questionStatus: QuestionStatus[], totalQuestions) {
        this.attempted = 0;
        this.indoubt = 0;
        this.unattempted = totalQuestions;
        this.questionStatus = questionStatus;
    }

    setAttempted(attempted: number) {
        this.attempted = attempted;
    }

    setUnattempted(unattempted: number) {
        this.unattempted = unattempted;
    }

}

export class QuestionStatus {
    questionId: any;
    status: string;
    color: string;
    linkedQuestionsStatus: QuestionStatus[];

    constructor(questionId: any) {
        this.questionId = questionId;
        this.status = 'UA';
        this.color = 'text-danger';
        this.linkedQuestionsStatus = [];
        // possible status value
        // attempted = 'A'
        // unattempted = 'UA'
        // indoubt = 'D'
    }

    setStatus(status: string) {
        this.status = status;
    }

    setColor(color: string) {
        this.color = color;
    }
}
