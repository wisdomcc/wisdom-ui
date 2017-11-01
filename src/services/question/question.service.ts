import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { QuestionModel } from '../../models/question/question.model';
import { SearchCriteria } from '../../models/question/searchcriteria.model';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  categoryData: any;
  responseData: any;
  categoryUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/viewAllExam';
  viewQuestionUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/fetch';
  insertQuestionUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/insert';
  uploadImageUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/uploadImage';
  constructor(private http: Http) {
    this.fetchCategoryDetails();
  }

  fetchCategoryDetails() {
    this.http.get(this.categoryUrl, {withCredentials: true})
      .map((res: Response) => res)
        .subscribe(res => {
          this.categoryData = JSON.parse(' { "exams" : ' + res.text() + '}');
        });
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

}
