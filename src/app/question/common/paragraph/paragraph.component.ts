import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionModel, Paragraph } from '../../../../models/question/question.model';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {

  isImageAvailable: boolean;
  isParagraphAvailable: boolean;
  paragraphImage: any;
  previewParagraphImage: string;
  imagePath: string;
  id: string;

  @Input() questionModel: QuestionModel;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.isImageAvailable = false;
    this.isParagraphAvailable = false;
    this.id = 'paragraphtext';
  }

  getFile (files, event: any) {
    // const eventObj: MSInputMethodContext = <MSInputMethodContext> fileInput;
    // const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    // const files: FileList = target.files;
    this.paragraphImage = files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.previewParagraphImage = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    // console.log(this.questionImage);
  }

  uploadParagraphImage() {
    this.questionService.uploadImage(this.paragraphImage, this.questionModel.id, 'paragraph')
    .subscribe(
      data => {
        setTimeout(() => {
          this.questionModel.paragraph.images.paths.push(JSON.parse(data).path);
          this.showNotification('Image uploaded successfully.', 'success', 2000);
        }, 2000);
        // this.getUploadedImage(JSON.parse(data).path);
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Image not uploaded.', 'danger', 5000);
      }
    );
  }

  getUploadedImage(path: string) {
    this.questionService.getUploadedImage(path)
      .subscribe(
        data => {
          this.questionModel.paragraph.images.paths.push(path);
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

  changeParagraphAvailibility(isParagraphAvailable: string) {
    if (isParagraphAvailable === 'true') {
      if(this.questionModel.paragraph === undefined) {
        this.questionModel.paragraph = new Paragraph(this.questionModel.id);
      }
      this.isParagraphAvailable = true;
    } else {
      this.questionModel.paragraph = undefined;
      this.isParagraphAvailable = false;
    }
  }

}

