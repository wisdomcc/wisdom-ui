import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { TestSeries } from '../../models/testseries/testseries.model';
import { TestSeriesAnswer } from '../../models/testseries/testseries.model';
import { TestSeriesEnrollment } from '../../models/testseries/testseries.model';
import { TestSeriesQuestionMap } from '../../models/testseries/testseries.model';
import { SearchCriteria } from '../../models/question/searchcriteria.model';
import { UserService } from '../user/user.service';
import 'rxjs/add/operator/map';

@Injectable()
export class TestSeriesService {

  categoryData: any;
  responseData: any;
  viewTestSeriesAnswerUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/fetchanswer';
  viewTestSeriesQuestionsUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/fetchquestions';
  viewTestSeriesUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/fetchall';
  viewTestSeriesEnrollmentUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/fetchenrollment';
  viewEnrolledTestSeriesUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/fetch';
  enrollTestSeriesUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/enroll';
  submitTestSeriesUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/submit';
  insertTestSeriesUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/insert';
  updateTestSeriesUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/update';
  insertTestSeriesQuestionMapUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/insertmap';

  constructor(private http: Http, private userService: UserService) {
  }

  fetchTestSeriesQuestions(testSeriesId) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.viewTestSeriesQuestionsUrl, testSeriesId, options)
      .map((res: Response) => res.text());
  }

  fetchEnrolledTestSeriesModels() {
    return this.http.get(this.viewEnrolledTestSeriesUrl, {withCredentials: true})
      .map((res: Response) => res.text());
  }

  fetchTestSeriesModels() {
    return this.http.get(this.viewTestSeriesUrl, {withCredentials: true})
      .map((res: Response) => res.text());
  }

  fetchTestSeriesEnrollments() {
    return this.http.get(this.viewTestSeriesEnrollmentUrl, {withCredentials: true})
      .map((res: Response) => res.text());
  }

  fetchTestSeriesAnswerModels(testSeriesId: any) {
    const formData = new FormData();
    formData.append('testSeriesId', testSeriesId);
    return this.http.post(this.viewTestSeriesAnswerUrl, formData, { withCredentials: true })
      .map((res: Response) => res.text());
  }

  enrollTestSeries(testSeriesEnrollments: TestSeriesEnrollment[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.enrollTestSeriesUrl, testSeriesEnrollments, options)
      .map((res: Response) => res.text());
  }

  submitTestSeries(answerModels: TestSeriesAnswer[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.submitTestSeriesUrl, answerModels, options)
      .map((res: Response) => res.text());
  }

  insertTestSeriesModels(testSeriesModels: TestSeries[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.insertTestSeriesUrl, testSeriesModels, options)
      .map((res: Response) => res.text());
  }

  insertTestSeriesQuestionMapModels(testSeriesQuestionMapModels: TestSeriesQuestionMap[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.insertTestSeriesQuestionMapUrl, testSeriesQuestionMapModels, options)
      .map((res: Response) => res.text());
  }

  updateTestSeriesModels(testSeriesModels: TestSeries[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.updateTestSeriesUrl, testSeriesModels, options)
      .map((res: Response) => res.text());
  }

}
