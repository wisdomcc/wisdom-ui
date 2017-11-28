import { Component, OnInit, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { UserService } from '../../../../services/user/user.service';
import { QuestionService } from '../../../../services/question/question.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.css']
})
export class SearchfilterComponent implements OnInit {

  
  id: string;
  year: number;
  subject: string;
  searchText: string;
  searchCriteria: SearchCriteria;
  categoryData: any;
  selectedSubject: string;
  selectedTopic: string;
  subjects: string[];
  topics: string[];
  fromYears: number[];
  toYears: number[];
  isTypeAheadHidden: boolean;
  @Output() searchEvent = new EventEmitter<string>();
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChildren('filterResult') filterResult;

  constructor(private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.searchCriteria = new SearchCriteria();
    this.id = 'searchfilter';
    this.isTypeAheadHidden = true;
    this.subjects = [];
    this.topics = [];
    this.fromYears = [];
    this.year = 0;
    this.selectedSubject = 'default';
    for (let year = 1991; year < (new Date()).getFullYear(); year++) {
      this.fromYears.push(year);
    }
    this.categoryData = JSON.parse(localStorage.getItem("categoryData"));
    this.getSubjects();
  }

  /*showTypeAheadOption() {
    if(this.searchText === undefined || this.searchText === '') {
      this.isTypeAheadHidden = true;
    } else {
      this.isTypeAheadHidden = false;
    }
    console.log(this.filterResult);
    if(this.filterResult.length === 0) {
      this.isTypeAheadHidden = true;
    }
    if(this.searchText.length > 2) {
      let search = this.searchText.split(':');
      for(let i = 0; i < search.length; i++) {
        console.log(search[i].trim());
      }
    }
}

  setHidden() {
    this.isTypeAheadHidden = true;
  }

  setSearchText(subject: string) {
    this.searchText = subject;
    this.isTypeAheadHidden = true;
  }*/

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
    this.selectedTopic = 'default';
    if (this.topics.length > 0) {
      for (let i = 0; i < length; i++) {
        this.topics.pop();
      }
    }
  }

  validateTextAndSearch() {
    var isMatch = false;
    if(this.searchText && this.searchText.trim() !== '') {
      let search = this.searchText.split(':');
      for(let i = 0; i < this.subjects.length; i++) {
        if(search[0].trim().match(this.subjects[i])) {
          isMatch = true;
          break;
        }
      }
      if(isMatch) {
        /*if(search[1] && search[1].trim() !== '') {
          let year = search[1].trim().split('to');
          if(year[1] && year[1] !== '') {
            let to = parseInt(year[1]);
            if(to > 1990 && to < 2018) {
              this.searchCriteria.toYear = to;
            } else {
              this.showNotification('Enter year between 1990 and current year', 'warning', 10000);
            }
          }
          if(year[0] && year[0] !== '') {
            let from = parseInt(year[0]);
            if(from > 1990 && from < 2018) {
              this.searchCriteria.fromYear = from;
            } else {
              this.showNotification('Enter year between 1990 and current year', 'warning', 10000);
            }
          }
        }*/
        this.selectedSubject = search[0].trim();
        this.getTopics();
        this.searchCriteria.relatedTo.subject.pop();
        this.searchCriteria.relatedTo.topic.pop();
        this.searchCriteria.relatedTo.subject.push(search[0].trim());
        this.search();
        /*if(!search[1] || (search[1] && search[1].trim() === '')) {
          this.searchText = this.searchText + " : ";
          this.showNotification('Enter year or year range after : . For Example -> 2015, 2012 to 2017', 'warning', 10000);
        } else {
        }*/
      } else {
        this.showNotification('Search Text do not match any subject.', 'danger', 5000);
      }
    } else {
      this.showNotification('Please enter any subject in text box.', 'danger', 5000);
    }
  }

  validateAndSearch() {
    this.searchText = '';
    if (this.selectedSubject !== undefined) {
      if (this.selectedSubject !== 'default') {
        this.searchCriteria.relatedTo.subject.pop();
        this.searchCriteria.relatedTo.subject.push(this.selectedSubject);
        this.searchText = this.searchText + this.selectedSubject + ' : ';
      } else {
        this.searchCriteria.relatedTo.subject.pop();
      }
    }
    if (this.selectedTopic !== undefined) {
      if (this.selectedTopic !== 'default') {
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

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

}

