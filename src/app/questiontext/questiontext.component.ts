import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionModel } from '../../models/question.model';
import { DataService } from '../data.service';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-questiontext',
  templateUrl: './questiontext.component.html',
  styleUrls: ['./questiontext.component.css']
})
export class QuestiontextComponent implements OnInit {

  isImageAvailable: boolean;
  questionImage: any;
  imagePath: string;
  id: string;

  @Input() questionModel: QuestionModel;
  @Input() index: number;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private dataservice: DataService) { }

  ngOnInit() {
    this.isImageAvailable = false;
    this.id = 'questiontext';
  }

  getFile (files) {
    // const eventObj: MSInputMethodContext = <MSInputMethodContext> fileInput;
    // const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    // const files: FileList = target.files;
    this.questionImage = files[0];
    console.log(this.questionImage);
  }

  uploadQuestionImage() {
    this.dataservice.uploadQuestionImage(this);
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

  changeImageAvailibility(isImageAvailable: string) {
    if (isImageAvailable === 'true') {
      this.isImageAvailable = true;
    } else {
      this.isImageAvailable = false;
    }
  }

}
