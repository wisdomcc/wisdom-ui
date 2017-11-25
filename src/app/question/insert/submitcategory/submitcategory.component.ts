import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { QuestionModel } from '../../../../models/question/question.model';
import { Category } from '../../../../models/question/question.model';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-submitcategory',
  templateUrl: './submitcategory.component.html',
  styleUrls: ['./submitcategory.component.css']
})
export class SubmitcategoryComponent implements OnInit {

  id: string;
  categoryData: any;
  selectedExam: string;
  selectedStream: string;
  selectedSubject: string;
  selectedTopic: string;
  selectedSubTopic: string;
  category: Category;
  streams: string[];
  subjects: string[];
  topics: string[];
  subTopics: string[];
  tags: string[];
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.id = "submitcategory";
    this.streams = [];
    this.subjects = [];
    this.topics = [];
    this.subTopics = [];
    this.tags = [ 'Language', 'Project', 'General' ];
    this.category = new Category();
    this.categoryData = JSON.parse(localStorage.getItem("categoryData"));
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

  submitCategory() {
    this.questionService.insertCategory(this.category)
    .subscribe(
      data => {
        this.showNotification('Category inserted successfully in database.', 'success');
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some error occured while inserting questions in database. Please retry.', 'error');
      }
    );
  }

  getStreams() {
    this.category.exam = this.selectedExam;
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          this.streams.push(this.categoryData.exams[i].streams[j].stream);
        }
        break;
      }
    }
  }

  getSubjects() {
    this.category.stream = this.selectedStream;
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if (this.selectedStream === this.categoryData.exams[i].streams[j].stream) {
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
    this.category.subject = this.selectedSubject;
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if (this.selectedStream === this.categoryData.exams[i].streams[j].stream) {
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

  getSubTopics() {
    this.category.topic = this.selectedTopic;
    for (let i = 0; i < this.categoryData.exams.length; i++) {
      if (this.selectedExam === this.categoryData.exams[i].exam) {
        for (let j = 0; j < this.categoryData.exams[i].streams.length; j++) {
          if (this.selectedStream === this.categoryData.exams[i].streams[j].stream) {
            for (let k = 0; k < this.categoryData.exams[i].streams[j].subjects.length; k++) {
              if (this.selectedSubject === this.categoryData.exams[i].streams[j].subjects[k].subject) {
                for (let l = 0; l < this.categoryData.exams[i].streams[j].subjects[k].topics.length; l++) {
                  if (this.selectedTopic === this.categoryData.exams[i].streams[j].subjects[k].topics[l].topic) {
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

}

