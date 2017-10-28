export class SearchCriteria {
    relatedTo: RelatedTo;
    marks: number;
    type: string;
    fromYear: number;
    toYear: number;

    constructor() {
      this.relatedTo = new RelatedTo();
      this.type = 'Previous Year';
      this.marks = 0;
      this.toYear = 0;
      this.fromYear = 0;
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
    this.exam = ['Gate'];
    this.stream = ['CS'];
    this.subject = [];
    this.subTopic = [];
    this.tags = [];
    this.topic = [];
  }
}