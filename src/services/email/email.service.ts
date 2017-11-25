import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { WisdomUser } from '../../models/user/wisdomuser.model';

@Injectable()
export class EmailService {

  emailUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/email/send';
  emailPasswordUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/email/sendpassword';

  constructor(private http: Http, private router: Router) {
  }

  sendEmail(name: string, subject: string, emailId: string, message: string) {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('subject', subject);
    formData.append('emailid', emailId);
    formData.append('message', message);
    return this.http.post(this.emailUrl, formData)
            .map((res: Response) => res.text());
  }

  emailPasswordToRegisteredUser(username: string) {
    const formData = new FormData();
    formData.append('username', username);
    return this.http.post(this.emailPasswordUrl, formData)
            .map((res: Response) => res.text());
  }

}
