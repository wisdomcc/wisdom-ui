import { Component, OnInit, Input } from '@angular/core';

import { QuestionModel } from '../../../../models/question/question.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() questionModel: QuestionModel;
  categoryData: any;
  selectedExam: string;
  selectedStream: string;
  selectedSubject: string;
  selectedTopic: string;
  selectedSubTopic: string;
  streams: string[];
  subjects: string[];
  topics: string[];
  subTopics: string[];
  tags: string[];

  constructor() { }

  ngOnInit() {
    this.selectedExam = 'default';
    this.streams = [];
    this.subjects = [];
    this.topics = [];
    this.subTopics = [];
    this.tags = [ 'Language', 'Project', 'General' ];
    this.categoryData = JSON.parse(localStorage.getItem('categoryData'));
  }

  getStreams() {
    this.selectedStream = 'default';
    if(this.selectedExam === 'default') {
      this.selectedStream = '';
      this.selectedSubject = '';
      this.selectedTopic = '';
      this.selectedSubTopic = '';
      this.streams = [];
      this.subjects = [];
      this.topics = [];
      this.subTopics = [];
    }
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          this.streams.pop();
        }
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          this.streams.push(this.categoryData.exams[i].streams[j].stream);
        }
        break;
      }
    }
  }

  getSubjects() {
    this.selectedSubject = 'default';
    if(this.selectedStream === 'default') {
      this.selectedSubject = '';
      this.selectedTopic = '';
      this.selectedSubTopic = '';
      this.subjects = [];
      this.topics = [];
      this.subTopics = [];
    }
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if (this.selectedStream === this.categoryData.exams[i].streams[j].stream) {
            for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
              this.subjects.pop();
            }
            for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
              this.subjects.push(this.categoryData.exams[i].streams[j].subjects[k].subject);
            }
            break;
          }
        }
      }
    }
  }

  getTopics() {
    this.selectedTopic = 'default';
    if(this.selectedSubject === 'default') {
      this.selectedTopic = '';
      this.selectedSubTopic = '';
      this.topics = [];
      this.subTopics = [];
    }
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if (this.selectedStream === this.categoryData.exams[i].streams[j].stream) {
            for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
              if (this.selectedSubject === this.categoryData.exams[i].streams[j].subjects[k].subject) {
                for (let l = 0; l < this.categoryData.exams[i].streams[j].subjects[k].topics.length; l++) {
                  this.topics.pop();
                }
                for (let l = 0; l < this.categoryData.exams[i].streams[j].subjects[k].topics.length; l++) {
                  this.topics.push(this.categoryData.exams[i].streams[j].subjects[k].topics[l].topic);
                }
                break;
              }
            }
          }
        }
      }
    }
  }

  getSubTopics() {
    this.selectedSubTopic = 'default';
    if(this.selectedTopic === 'default') {
      this.selectedSubTopic = '';
      this.subTopics = [];
    }
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if (this.selectedStream === this.categoryData.exams[i].streams[j].stream) {
            for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
              if (this.selectedSubject === this.categoryData.exams[i].streams[j].subjects[k].subject) {
                for (let l = 0; l < this.categoryData.exams[i].streams[j].subjects[k].topics.length; l++) {
                  if (this.selectedTopic === this.categoryData.exams[i].streams[j].subjects[k].topics[l].topic) {
                    for (let m = 0; m < this.categoryData.exams[i].streams[j].subjects[k].topics[l].subTopics.length; m++) {
                      this.subTopics.pop();
                    }
                    for (let m = 0; m < this.categoryData.exams[i].streams[j].subjects[k].topics[l].subTopics.length; m++) {
                      this.subTopics.push(this.categoryData.exams[i].streams[j].subjects[k].topics[l].subTopics[m].subTopic);
                    }
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  addRelatedField() {
    this.questionModel.relatedTo.exam.push((this.selectedExam !== 'default') ? this.selectedExam : 'BLANK');
    this.questionModel.relatedTo.stream.push((this.selectedStream !== 'default') ? this.selectedStream : 'BLANK');
    this.questionModel.relatedTo.subject.push((this.selectedSubject !== 'default') ? this.selectedSubject : 'BLANK');
    this.questionModel.relatedTo.topic.push((this.selectedTopic !== 'default') ? this.selectedTopic : 'BLANK');
    this.questionModel.relatedTo.subTopic.push((this.selectedSubTopic !== 'default') ? this.selectedSubTopic : 'BLANK');
    // console.log(this.questionModel.relatedTo);
  }

  removeRelatedField(index) {
    this.questionModel.relatedTo.exam.splice(index, 1);
    this.questionModel.relatedTo.stream.splice(index, 1);
    this.questionModel.relatedTo.subject.splice(index, 1);
    this.questionModel.relatedTo.topic.splice(index, 1);
    this.questionModel.relatedTo.subTopic.splice(index, 1);
  }

}
