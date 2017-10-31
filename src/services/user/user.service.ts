import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {

  private loggedIn = new Subject<boolean>();
  loggedIn$ = this.loggedIn.asObservable();
  loginUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/user/login';
  registrationUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/user/registration';

  constructor(private http: Http) {
  }

  isLoggedIn() {
    return this.loggedIn.next(true);
  }

  loginUser(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.http.post(this.loginUrl, formData)
      .map((res: Response) => res.text());
  }

  registerUser(username: string, password: string, emailid: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('emailid', emailid);
    return this.http.post(this.loginUrl, formData)
      .map((res: Response) => res.text());
  }

}
