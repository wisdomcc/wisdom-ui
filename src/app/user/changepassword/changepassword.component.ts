import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from '../../../services/user/user.service';
import { NotificationComponent } from '../../common/notification/notification.component';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  id: string;
  oldpassword: string;
  newpassword: string;
  confirmnewpassword: string;
  isValidOldPassword: boolean;
  isValidNewPassword: boolean;
  isValidConfirmNewPassword: boolean;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isValidOldPassword = false;
    this.isValidNewPassword = false;
    this.isValidConfirmNewPassword = false;
    this.id = 'changepassword';
  }

  changePassword() {
    this.userService.changePassword(this.oldpassword, this.newpassword)
      .subscribe(
        data => {
            const response = JSON.parse(data);
            this.showNotification(response.message, response.type);
            this.oldpassword = '';
            this.newpassword = '';
            this.confirmnewpassword = '';
        },
        error => {
            this.showNotification('Technical issue. Please try after sometime.', 'error');
        }
    );
  }

  validateOldPassword() {
    if (!this.oldpassword || this.oldpassword === '') {
      this.showNotification('Old Password cannot be empty.', 'error');
      return false;
    }
    if (this.oldpassword.indexOf(' ') > -1) {
      this.showNotification('Old Password should not contain empty space.', 'error');
      return false;
    }
    this.notification.hideAlert = true;
    this.isValidOldPassword = true;
  }

  validateNewPassword() {
    if (!this.newpassword || this.newpassword === '') {
      this.showNotification('New Password cannot be empty.', 'error');
      return false;
    }
    if (this.oldpassword.indexOf(' ') > -1) {
      this.showNotification('New Password should not contain empty space.', 'error');
      return false;
    }
    this.notification.hideAlert = true;
    this.isValidNewPassword = true;
  }

  validateConfirmNewPassword() {
    if (!this.confirmnewpassword  || this.confirmnewpassword === '') {
      this.showNotification('Confirm New Password cannot be empty.', 'error');
      return false;
    }
    if (this.newpassword !== this.confirmnewpassword) {
      this.showNotification('New Password and Confirm New Password should be same.', 'error');
      return false;
    }
    this.notification.hideAlert = true;
    this.isValidConfirmNewPassword = true;
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

  isValid() {
    return this.isValidConfirmNewPassword &&
          this.isValidNewPassword &&
          this.isValidOldPassword; 
  }

}
