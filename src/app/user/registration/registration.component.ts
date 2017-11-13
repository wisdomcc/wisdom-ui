import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationComponent } from '../../common/notification/notification.component';
import { UserService } from '../../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  id: string;
  username: string;
  password: string;
  emailid: string;
  confirmpassword: string;
  usernameError: string;
  passwordError: string;
  emailError: string;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  ngOnInit() {
      this.id = 'registration';
      this.usernameError = '';
      this.emailError = '';
      this.passwordError = '';
    }

  registerUser() {

    if (this.usernameError !== '' || this.emailError !== '' || this.passwordError !== '') {
      this.showNotification('There is some error in registration form.', 'error');
      return;
    }
    this.userService.registerUser(this.username, this.password, this.emailid)
    .subscribe(
        data => {
            const response = JSON.parse(data);
            this.showNotification(response.message, response.type);
            this.username = '';
            this.emailid = '';
            this.password = '';
            this.confirmpassword = '';
        },
        error => {
            this.showNotification('Technical issue. Please try after sometime.', 'error');
        }
    );
  }

  showNotification(msg: string, type: string) {
      this.notification.showNotification(msg, type, this.id);
  }

  validateUsername() {
    this.usernameError = '';
    if (!this.username) {
      this.usernameError = 'Username cannot be empty.';
      return;
    }
    if (this.username === '') {
      this.usernameError = 'Username cannot be empty.';
      return;
    }
    if (this.username.indexOf(' ') > -1) {
      this.usernameError = 'Username should not contain space.';
      return;
    }
    this.userService.isUsernameExisting(this.username)
      .subscribe(
        data => {
          const response = JSON.parse(data);
          if (response.message) {
            this.usernameError = response.message;
          }
        },
      error => {

      });
  }

  validateEmail() {
    this.emailError = '';
    if (!this.emailid) {
      this.emailError = 'EmailId cannot be empty.';
      return;
    }
    if (this.emailid === '') {
      this.emailError = 'EmailId cannot be empty.';
      return;
    }
    if (this.emailid.indexOf(' ') > -1) {
      this.emailError = 'EmailId should not contain space.';
      return;
    }
    const emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (!emailRegex.test(this.emailid)) {
      this.emailError = 'EmailId format is not correct.';
      return;
    }
    this.userService.isEmailExisting(this.emailid)
      .subscribe(
        data => {
          const response = JSON.parse(data);
          if (response.message) {
            this.emailError = response.message;
          }
        },
      error => {

      });
  }

  validatePassword() {
    this.passwordError = '';
    if (!this.password) {
      this.passwordError = 'Password cannot be empty.';
      return;
    }
    if (this.password === '') {
      this.passwordError = 'Password cannot be empty.';
      return;
    }
    if (this.password.indexOf(' ') > -1) {
      this.passwordError = 'Password should not contain space.';
      return;
    }
  }

  validateConfirmPassword() {
    this.passwordError = '';
    if (!this.confirmpassword) {
      this.passwordError = 'Confirm password cannot be empty.';
      return;
    }
    if (this.password !== this.confirmpassword) {
      this.passwordError = 'Password and Confirm Password should be same.';
      return;
    }
  }

}
