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
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  ngOnInit() {
      this.id = 'registration';
    }

  registerUser() {
    this.userService.registerUser(this.username, this.password, this.emailid)
    .subscribe(
        data => {
            this.showNotification('Login successful', 'success');
            this.router.navigateByUrl(data);
        },
        error => {
            this.showNotification('Technical issue. Please try after sometime.', 'error');
        }
    );
  }

  showNotification(msg: string, type: string) {
      this.notification.showNotification(msg, type, this.id);
  }
}
