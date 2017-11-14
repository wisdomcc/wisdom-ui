import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { TestSeries } from '../../models/testseries/testseries.model';
import { SearchCriteria } from '../../models/question/searchcriteria.model';
import { UserService } from '../user/user.service';
import 'rxjs/add/operator/map';

@Injectable()
export class TestSeriesService {

  categoryData: any;
  responseData: any;
  viewTestSeriesUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/fetch';
  insertTestSeriesUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/insert';
  updateTestSeriesUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/testseries/update';

  constructor(private http: Http, private userService: UserService) {
  }

  insertTestSeriesModels(testSeriesModels: TestSeries[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.insertTestSeriesUrl, testSeriesModels, options)
      .map((res: Response) => res.text());
  }

  updateTestSeriesModels(testSeriesModels: TestSeries[]) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.updateTestSeriesUrl, testSeriesModels, options)
      .map((res: Response) => res.text());
  }

}
