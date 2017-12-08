import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  id: string;
  newOptionVal: string;
  optionImage: string;
  previewOptionImage: string;
  optionState: string;
  isUploadDisabled: boolean;
  @Input() questionModel: QuestionModel;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService) {}

  ngOnInit() {
    this.isUploadDisabled = false;
    this.optionState = 'Text';
    this.id = 'options';
  }

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

  getFile (files, event: any) {
    // const eventObj: MSInputMethodContext = <MSInputMethodContext> fileInput;
    // const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    // const files: FileList = target.files;
    this.optionImage = files[0];
    // this.previewOptionImage = URL.createObjectURL(this.optionImage);
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.previewOptionImage = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    // console.log(this.optionImage);
  }

  uploadOptionsImage() {
    this.isUploadDisabled = true;
    this.questionService.uploadImage(this.optionImage, this.questionModel.id, 'option')
    .subscribe(
      data => {
        this.questionModel.options.imagePath.push(JSON.parse(data).path);
        this.showNotification('Image uploaded successfully.', 'success', 2000);
        this.previewOptionImage = '';
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
          this.questionModel.options.imagePath.push(path);
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

  getStatus(option: string) {
    if (option === this.questionModel.options.type) {
      return false;
    }
    return true;
  }

  addOption() {
    if (this.newOptionVal && this.newOptionVal !== '') {
      this.questionModel.options.option
          .push(this.newOptionVal);
      this.newOptionVal = '';
    }
    this.previewQuestion();
  }

  removeOption(index: number) {
    this.questionModel.options.option.splice(index, 1);
  }

  removeOptionImagePath(index: number) {
    this.questionModel.options.imagePath.splice(index, 1);
  }

  removeOptionAndImagePath(index: number) {
    this.questionModel.options.option.splice(index, 1);
    this.questionModel.options.imagePath.splice(index, 1);
  }

  isBlankImage(index: number) {
    if (this.questionModel.options.imagePath[index] === 'BLANK') {
      return true;
    }
    return false;
  }

  isOptionEmpty(index: number) {
    if (this.questionModel.options.option[index] === undefined) {
      return true;
    }
    return false;
  }

  previewQuestion() {
    this.questionService.previewQuestion(this.questionModel);
  }

}
