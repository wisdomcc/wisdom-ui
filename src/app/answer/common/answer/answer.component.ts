import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AnswerModel } from '../../../../models/answer/answer.model';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  isUploadDisabled: boolean;
  isImageAvailable: boolean;
  answerImage: any;
  previewAnswerImage: string;
  imagePath: string;
  id: string;

  @Input() answerModel: AnswerModel;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.isUploadDisabled = false;
    this.isImageAvailable = false;
    this.id = 'answer';
  }

  getFile (files, event: any) {
    // const eventObj: MSInputMethodContext = <MSInputMethodContext> fileInput;
    // const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    // const files: FileList = target.files;
    this.answerImage = files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.previewAnswerImage = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    // console.log(this.questionImage);
  }

  uploadAnswerImage() {
    this.isUploadDisabled = true;
    this.questionService.uploadImage(this.answerImage, this.answerModel.questionId, 'answer')
    .subscribe(
      data => {
        this.answerModel.explanation.imagePath.push(JSON.parse(data).path);
        this.showNotification('Image uploaded successfully.', 'success', 2000);
        this.previewAnswerImage = '';
        this.isUploadDisabled = false;
        // this.getUploadedImage(JSON.parse(data).path);
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Image not uploaded.', 'danger', 5000);
        this.isUploadDisabled = false;
      }
    );
  }

  getUploadedImage(path: string) {
    this.questionService.getUploadedImage(path)
      .subscribe(
        data => {
          this.answerModel.explanation.imagePath.push(path);
          this.showNotification('Image uploaded successfully.', 'success', 2000);
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

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

  changeImageAvailibility(isImageAvailable: string) {
    if (isImageAvailable === 'true') {
      this.isImageAvailable = true;
    } else {
      this.isImageAvailable = false;
    }
  }

  previewQuestion() {
    MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, this.answerModel.explanation.description ]);
  }

}

