import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { WisdomUser } from '../../models/user/wisdomuser.model';

@Injectable()
export class UserService {

  private loggedIn = new Subject<WisdomUser>();
  loggedIn$ = this.loggedIn.asObservable();
  loginUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/login';
  registrationUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/registration';

  constructor(private http: Http) {
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
    return this.http.post(this.loginUrl, formData)
      .map((res: Response) => res.text());
  }

}
