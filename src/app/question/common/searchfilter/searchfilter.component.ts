import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { UserService } from '../../../../services/user/user.service';
import { QuestionService } from '../../../../services/question/question.service';
import { NotificationComponent } from '../../../common/notification/notification.component';
import { SearchResult } from '../../../../models/question/searchresult.model';

@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.css']
})
export class SearchfilterComponent implements OnInit {

  id: string;
  year: number;
  searchText: string;
  searchCriteria: SearchCriteria;
  categoryData: any;
  selectedSubject: string;
  selectedTopic: string;
  subjects: string[];
  topics: string[];
  fromYears: number[];
  toYears: number[];
  @Output() searchEvent = new EventEmitter<string>();
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.searchCriteria = new SearchCriteria();
    this.id = 'searchfilter';
    this.subjects = ['Select Subject'];
    this.topics = ['Select Topic'];
    this.fromYears = [];
    this.year = 0;
    for (let year = 1991; year < (new Date()).getFullYear(); year++) {
      this.fromYears.push(year);
    }
    this.categoryData = JSON.parse(localStorage.getItem("categoryData"));
    this.getSubjects();
  }

  getToYears() {
    this.year = 0;
    if(this.searchCriteria.fromYear != 0) {
      this.toYears = [];
      const startYear = +this.searchCriteria.fromYear + 1;
      for (let year = startYear; year < (new Date()).getFullYear(); year++) {
        this.toYears.push(year);
      }
      this.searchCriteria.toYear = this.toYears[0];
    } else {
      this.searchCriteria.toYear = 0;
    }
  }

  getSubjects() {
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

  clearYearRange() {
    this.searchCriteria.fromYear = 0;
    this.searchCriteria.toYear = 0;
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

  showTypeAheadOption() {
    if(this.searchText.length > 2) {
      return true;
    }
  }

  validateTextAndSearch() {
    return true;
  }

  validateAndSearch() {
    this.searchText = '';
    if (this.selectedSubject !== undefined) {
      if (this.selectedSubject !== 'Select Subject') {
        this.searchCriteria.relatedTo.subject.pop();
        this.searchCriteria.relatedTo.subject.push(this.selectedSubject);
        this.searchText = this.searchText + this.selectedSubject + ' : ';
      } else {
        this.searchCriteria.relatedTo.subject.pop();
      }
    }
    if (this.selectedTopic !== undefined) {
      if (this.selectedTopic !== 'Select Topic') {
        this.searchCriteria.relatedTo.topic.pop();
        this.searchCriteria.relatedTo.topic.push(this.selectedTopic);
        this.searchText = this.searchText + this.selectedTopic + ' : ';
      } else {
        this.searchCriteria.relatedTo.topic.pop();
      }
    }
    if(this.year != 0) {
      this.searchText = this.searchText + this.year;
      this.searchCriteria.fromYear = this.year;
    } else {
      if (this.searchCriteria.fromYear != 0) {
        this.searchText = this.searchText + this.searchCriteria.fromYear;
        this.searchText = this.searchText + ' to ' + this.searchCriteria.toYear;
      } else {
        this.searchText = this.searchText.substring(0, this.searchText.length - 3);
      }
    }
    this.search();
    if(this.year != 0) {
      this.searchCriteria.fromYear = 0;
    }
  }

  search() {
    this.searchEvent.next('search');
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}

