import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { WisdomUser } from '../../models/user/wisdomuser.model';

@Injectable()
export class UserService {

  private loggedIn = new Subject<WisdomUser>();
  loggedIn$ = this.loggedIn.asObservable();
  loginUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/login';
  logoutUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/logout';
  registrationUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/registration';
  isUsernameExistingUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/isusernamepresent';
  isEmailExistingUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/isemailpresent';

  constructor(private http: Http, private router: Router) {
  }

  isLoggedIn(user: WisdomUser) {
    return this.loggedIn.next(user);
  }

  loginUser(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post(this.loginUrl, formData, {withCredentials: true})
      .map((res: Response) => res.text());
  }

  registerUser(username: string, password: string, emailid: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('emailid', emailid);
    return this.http.post(this.registrationUrl, formData)
      .map((res: Response) => res.text());
  }

  isUsernameExisting(username: string) {
    const formData = new FormData();
    formData.append('username', username);
    return this.http.post(this.isUsernameExistingUrl, formData)
      .map((res: Response) => res.text());
  }

  isEmailExisting(emailid: string) {
    const formData = new FormData();
    formData.append('emailid', emailid);
    return this.http.post(this.isEmailExistingUrl, formData)
      .map((res: Response) => res.text());
  }

  logout() {
    // console.log('user getting logged out as session is expired.');
    this.http.get(this.logoutUrl, {withCredentials: true})
      .map((res: Response) => res)
      .subscribe(
        data => {
          console.log('logout successful');
        },
        error => {
          console.log('logout failed');
        }
      );
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
