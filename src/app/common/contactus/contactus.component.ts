import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailService } from '../../../services/email/email.service';
import { UserService } from '../../../services/user/user.service';
import { NotificationComponent } from '../../common/notification/notification.component';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private emailService: EmailService,
              private userService: UserService) { }

  ngOnInit() {
    this.id = 'contactus';
  }

  submit() {
    this.emailService.sendEmail(this.name, this.subject, this.email, this.message)
      .subscribe(
        data => {
          this.showNotification('Your request has been mailed successfully.', 'success', 2000);
          this.name = '';
          this.subject = '';
          this.email = '';
          this.message = '';
        },
        error => {
          if (error.status === 401) {
            this.userService.logout();
          }
          this.showNotification('Your request failed. Please retry.', 'danger', 5000);
        }
      );
  }

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

}
