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
  optionState: string;
  @Input() questionModel: QuestionModel;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService) {}

  ngOnInit() {
    this.optionState = 'Text';
    this.id = 'options';
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

  getFile (files) {
    // const eventObj: MSInputMethodContext = <MSInputMethodContext> fileInput;
    // const target: HTMLInputElement = <HTMLInputElement> eventObj.target;
    // const files: FileList = target.files;
    this.optionImage = files[0];
    // console.log(this.optionImage);
  }

  uploadOptionsImage() {
    this.questionService.uploadOptionImage(this.optionImage, this.questionModel.id)
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
          this.questionModel.options.imagePath.push(this.questionService.getImageUrl + path);
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

  changeOptionState(optionState: string) {
    this.optionState = optionState;
    this.questionModel.options.type = optionState;
  }

  getStatus(option: string) {
    if (option === this.optionState) {
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

}
