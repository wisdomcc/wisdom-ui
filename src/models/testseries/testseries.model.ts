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