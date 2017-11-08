import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { AnswerModel } from '../../models/answer/answer.model';
import { UserService } from '../user/user.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AnswerService {


  viewAnswerUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/answer/fetch';
  insertAnswerUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/answer/insert';
  updateAnswerUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/answer/update';

  constructor(private http: Http, private userService: UserService) {
  }

  insertAnswerModels(answerModels: AnswerModel[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.insertAnswerUrl, answerModels, options)
      .map((res: Response) => res.text());
  }

  updateQuestionModels(answerModels: AnswerModel[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.updateAnswerUrl, answerModels, options)
      .map((res: Response) => res.text());
  }

}
