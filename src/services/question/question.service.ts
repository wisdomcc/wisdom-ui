import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { QuestionModel } from '../../models/question/question.model';
import { SearchCriteria } from '../../models/question/searchcriteria.model';
import { UserService } from '../user/user.service';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  categoryData: any;
  responseData: any;
  categoryUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/viewAllExam';
  viewQuestionUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/fetch';
  insertQuestionUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/insert';
  updateQuestionUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/update';
  uploadImageUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/uploadImage';
  getImageUrl = window.location.protocol + '//' + window.location.hostname + ':8080';

  constructor(private http: Http, private userService: UserService) {
    this.fetchCategoryDetails();
  }

  fetchCategoryDetails() {
    this.http.get(this.categoryUrl, {withCredentials: true})
      .map((res: Response) => res)
        .subscribe(
          data => {
            this.categoryData = JSON.parse(' { "exams" : ' + data.text() + '}');
          },
          error => {
            if (error.status === 401) {
              this.userService.logout();
            }
          }
        );
  }

  getCategoryDetails() {
    return this.categoryData;
  }

  insertQuestionModels(questionModels: QuestionModel[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.insertQuestionUrl, questionModels, options)
      .map((res: Response) => res.text());
  }

  updateQuestionModels(questionModels: QuestionModel[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.updateQuestionUrl, questionModels, options)
      .map((res: Response) => res.text());
  }

  uploadQuestionImage(questionImage: any, id: string) {
    const formData = new FormData();
    formData.append('file', questionImage);
    formData.append('questionid', id);
    formData.append('option', 'false');
    return this.http.post(this.uploadImageUrl, formData, {withCredentials: true})
      .map((res: Response) => res.text());
  }

  uploadOptionImage(optionImage: any, id: string) {
    const formData = new FormData();
    formData.append('file', optionImage);
    formData.append('questionid', id);
    formData.append('option', 'true');
    return this.http.post(this.uploadImageUrl, formData, {withCredentials: true})
      .map((res: Response) => res.text());
  }

  viewQuestion(searchCriteria: SearchCriteria) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.viewQuestionUrl, JSON.stringify(searchCriteria), options)
      .map((res: Response) => res.text());

  }

  getUploadedImage(path: string) {
    return this.http.get(this.getImageUrl + path, {withCredentials: true})
      .map((res: Response) => res.text());
  }

}
