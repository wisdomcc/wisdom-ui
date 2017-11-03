import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
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

  constructor(private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.isImageAvailable = false;
    this.id = 'questiontext';
  }

  getFile (files) {
    // const eventObj: MSInputMethodContext = <MSInputMethodContext> fileInput;
    // const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    // const files: FileList = target.files;
    this.questionImage = files[0];
    // console.log(this.questionImage);
  }

  uploadQuestionImage() {
    this.questionService.uploadQuestionImage(this.questionImage, this.questionModel.id)
    .subscribe(
      data => {
        this.getUploadedImage(JSON.parse(data).path);
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Image not uploaded.', 'error');
      }
    );
  }

  getUploadedImage(path: string) {
    this.questionService.getUploadedImage(path)
      .subscribe(
        data => {
          this.questionModel.images.paths.push(path);
          this.showNotification('Image uploaded successfully.', 'success');
        },
        error => {
          if (error.status === 401) {
            this.userService.logout();
          }
          setTimeout(() => {
            this.getUploadedImage(path);
          }, 2000);
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
