import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NotificationComponent } from '../../common/notification/notification.component';
import { UserService } from '../../../services/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    id: string;
    username: string;
    password: string;
    redirectUrl: string;
    @ViewChild(NotificationComponent) notification: NotificationComponent;

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.id = 'login';
        this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
      }

    loginUser() {
        this.userService.loginUser(this.username, this.password)
        .subscribe(
            data => {
                console.log(data);
                this.showNotification('Login successful', 'success');
                localStorage.setItem('currentUser', data);
                this.userService.isLoggedIn();
                this.router.navigateByUrl(this.redirectUrl);
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
