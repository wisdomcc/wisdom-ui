import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { QuestionService } from '../../../../services/question/question.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

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

  constructor(private dataservice: QuestionService) { }

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
    this.dataservice.uploadQuestionImage(this.questionImage, this.questionModel.id)
    .subscribe(
      data => {
        this.questionModel.images.paths.push(JSON.parse(data).path);
        this.showNotification('Image uploaded successfully.', 'success');
      },
      error => {
        this.showNotification('Image not uploaded.', 'error');
      }
    );
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
