import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { QuestionService } from '../../../../services/question/question.service';
import { NotificationComponent } from '../../../common/notification/notification.component';
import { PreviewquestionComponent } from '../previewquestion/previewquestion.component';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css']
})
export class ViewquestionComponent implements OnInit {

  id: string;
  searchCriteria: SearchCriteria;
  categoryData: any;
  selectedSubject: string;
  selectedTopic: string;
  subjects: string[];
  topics: string[];
  fromYears: number[];
  toYears: number[];
  isDataPresent: boolean;
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(PreviewquestionComponent) previewQuestion: PreviewquestionComponent;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.searchCriteria = new SearchCriteria();
    this.isDataPresent = false;
    this.id = 'viewquestion';
    this.subjects = ['Select Subject'];
    this.topics = ['Select Topic'];
    this.fromYears = [];
    for (let year = 1991; year < (new Date()).getFullYear(); year++) {
      this.fromYears.push(year);
    }
  }

  getToYears() {
    this.toYears = [];
    const startYear = +this.searchCriteria.fromYear + 1;
    for (let year = startYear; year < (new Date()).getFullYear(); year++) {
      this.toYears.push(year);
    }
  }

  getSubjects() {
    if (this.categoryData === undefined) {
      this.categoryData = this.questionService.getCategoryDetails();
      for (let i = 0; i < this.categoryData.exams.length; i++) {
        if ('Gate' === this.categoryData.exams[i].exam) {
          for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
            if ('CS' === this.categoryData.exams[i].streams[j].stream) {
              for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
                this.subjects.push(this.categoryData.exams[i].streams[j].subjects[k].subject);
              }
              break;
            }
          }
        }
      }
    }
  }

  getTopics() {
    this.clearTopics();
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if ('Gate' === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if ('CS' === this.categoryData.exams[i].streams[j].stream) {
            for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
              if (this.selectedSubject === this.categoryData.exams[i].streams[j].subjects[k].subject) {
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

  clearTopics() {
    const length = this.topics.length;
    this.selectedTopic = 'Select Topic';
    if (this.topics.length > 0) {
      for (let i = 0; i < length; i++) {
        this.topics.pop();
      }
    }
    this.topics.push('Select Topic');
  }

  viewQuestion() {
    if (this.selectedSubject !== undefined) {
      if (this.selectedSubject !== 'Select Subject') {
        this.searchCriteria.relatedTo.subject.pop();
        this.searchCriteria.relatedTo.subject.push(this.selectedSubject);
      } else {
        this.searchCriteria.relatedTo.subject.pop();
      }
    }
    if (this.selectedTopic !== undefined) {
      if (this.selectedTopic !== 'Select Topic') {
        this.searchCriteria.relatedTo.topic.pop();
        this.searchCriteria.relatedTo.topic.push(this.selectedTopic);
      } else {
        this.searchCriteria.relatedTo.topic.pop();
      }
    }
    this.questionService.viewQuestion(this);
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}
