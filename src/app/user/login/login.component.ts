import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NotificationComponent } from '../../common/notification/notification.component';
import { UserService } from '../../../services/user/user.service';
import { QuestionService } from '../../../services/question/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { WisdomUser } from '../../../models/user/wisdomuser.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    id: string;
    username: string;
    password: string;
    redirectUrl: string;
    registerUserUrl: string;
    user: WisdomUser;
    @ViewChild(NotificationComponent) notification: NotificationComponent;

    constructor(private userService: UserService,
                private router: Router,
                private route: ActivatedRoute,
                private questionService: QuestionService) { }

    ngOnInit() {
        this.id = 'login';
        this.registerUserUrl = '/registration';
        this.redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/';
      }

    loginUser() {
        this.userService.loginUser(this.username, this.password)
        .subscribe(
            data => {
                if(JSON.parse(data).type === 'error') {
                    this.showNotification(JSON.parse(data).message, 'error');
                } else {
                    // console.log(data);
                    this.user = this.getWisdomUser(JSON.parse(data));
                    // console.log(this.user);
                    this.showNotification('Login successful', 'success');
                    localStorage.setItem('username', this.user.username);
                    localStorage.setItem('email', this.user.emailId);
                    localStorage.setItem('role', this.user.role);
                    localStorage.setItem('enabled', 'true');
                    this.questionService.fetchCategoryDetails()
                        .subscribe(
                            data => {
                                localStorage.setItem('categoryData', ' { "exams" : ' + data + '}');
                            },
                            error => {
                                if (error.status === 401) {
                                    this.userService.logout();
                                }
                            }
                        );
                    this.userService.isLoggedIn(this.user);
                    this.router.navigateByUrl(this.redirectUrl);
                }
            },
            error => {
                console.log(error);
                this.showNotification('Technical issue. Please try after sometime.', 'error');
            }
        );
    }

    registerUser() {
        this.router.navigateByUrl(this.registerUserUrl);
    }

    forgotPassword() {
        this.showNotification('Password sent to your email.', 'status');
    }

    getWisdomUser(data: any): WisdomUser {
        const accountNonExpired: boolean = data.accountNonExpired;
        const accountNonLocked: boolean = data.accountNonLocked;
        const role: string = data.authorities[0].authority;
        const credentialsNonExpired: boolean = data.credentialsNonExpired;
        const emailId: string = data.emailId;
        const enabled: boolean = data.enabled;
        const maxConcurrentSessions: number = data.maxConcurrentSessions;
        const username: string = data.username;
        return new WisdomUser(accountNonExpired, accountNonLocked, role, credentialsNonExpired,
            emailId, enabled, maxConcurrentSessions, username);
    }

    showNotification(msg: string, type: string) {
        this.notification.showNotification(msg, type, this.id);
    }

}
