import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { QuestionModel } from '../../models/question/question.model';
import { QuestiontextComponent } from '../../app/question/common/questiontext/questiontext.component';
import { ViewquestionComponent } from '../../app/question/search/viewquestion/viewquestion.component';
import { SubmitquestionComponent } from '../../app/question/insert/submitquestion/submitquestion.component';
import { OptionsComponent } from '../../app/question/common/options/options.component';
import { NotificationComponent } from '../../app/common/notification/notification.component';
import { SearchCriteria } from '../../models/question/searchcriteria.model';
import { SearchResult } from '../../models/question/searchresult.model';
import 'rxjs/add/operator/map';

@Injectable()
export class QuestionService {

  categoryData: any;
  responseData: any;
  iqResponseData: any;
  categoryUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/viewAllExam';
  viewQuestionUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/fetch';
  insertQuestionUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/insert';
  uploadImageUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/uploadImage';
  constructor(private http: Http) {
    this.fetchCategoryDetails();
  }

  fetchCategoryDetails() {
    this.http.get(this.categoryUrl)
      .map((res: Response) => res)
        .subscribe(res => {
          this.categoryData = JSON.parse(' { "exams" : ' + res.text() + '}');
        });
  }

  getCategoryDetails() {
    return this.categoryData;
  }

  insertQuestionModels(submitQuestion: SubmitquestionComponent) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.http.post(this.insertQuestionUrl, submitQuestion.questionModels, options)
      .map((res: Response) => res)
        .subscribe(
          res => {
            this.iqResponseData = res.text();
            submitQuestion.showNotification('Questions inserted successfully in database.', 'success');
            submitQuestion.questionModels = [];
          },
          error => {
            submitQuestion.showNotification('Some error oaccured while inserting questions in database. Please retry.', 'error');
          }
        );
  }

  uploadQuestionImage(questiontextComponent: QuestiontextComponent) {
    const formData = new FormData();
    formData.append('file', questiontextComponent.questionImage);
    formData.append('questionid', questiontextComponent.questionModel.id);
    formData.append('option', 'false');
    this.http.post(this.uploadImageUrl, formData)
      .map((res: Response) => res)
        .subscribe(
          res => {
            this.responseData = JSON.parse(res.text());
            questiontextComponent.questionModel.images.paths.push(this.responseData.path);
            questiontextComponent.showNotification('Image uploaded successfully.', 'success');
          },
          error => {
            questiontextComponent.showNotification('Image not uploaded.', 'error');
          }
        );
  }

  uploadOptionImage(optionsComponent: OptionsComponent) {
    const formData = new FormData();
    formData.append('file', optionsComponent.optionImage);
    formData.append('questionid', optionsComponent.questionModel.id);
    formData.append('option', 'true');
    this.http.post(this.uploadImageUrl, formData)
      .map((res: Response) => res)
        .subscribe(
          res => {
            this.responseData = JSON.parse(res.text());
            optionsComponent.questionModel.options.imagePath.push(this.responseData.path);
            optionsComponent.showNotification('Image uploaded successfully.', 'success');
          },
          error => {
            optionsComponent.showNotification('Image not uploaded.', 'error');
          }
        );
  }

  viewQuestion(viewQuestion: ViewquestionComponent) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers });
    this.http.post(this.viewQuestionUrl, JSON.stringify(viewQuestion.searchCriteria), options)
    .map((res: Response) => res)
      .subscribe(res => {
        viewQuestion.previewQuestion.data = this.getSearchResult(JSON.parse(res.text()));
        viewQuestion.previewQuestion.onChangeTable(viewQuestion.previewQuestion.config);
        if (viewQuestion.previewQuestion.data.length > 0) {
          viewQuestion.isDataPresent = true;
        } else {
          viewQuestion.showNotification('No result for your criteria.', 'error');
        }
      },
      error => {
        viewQuestion.showNotification('Some technical issue. Please try after sometime.', 'error');
      });

  }

  public getSearchResult(response: QuestionModel[]): Array<SearchResult> {
    const result = [];
    for (let i = 0; i < response.length; i++) {
      const searchresult = new SearchResult();
      /*if (response[i].question.indexOf('$') > 0) {
        searchresult.question = '<div id="mathjax">Q) ' + response[i].question + '<br/><br/>';
      } else {
        searchresult.question = 'Q) ' + response[i].question + '<br/><br/>';
      }*/
      searchresult.question = 'Q) ' + response[i].question;
      if (response[i].options.type !== 'NoOption') {
        searchresult.options = [];
        for (let j = 0; j < response[i].options.option.length; j++) {
          searchresult.options.push((+j + 1) + ') ' + response[i].options.option[j]);
        }
      }
      /*if (response[i].question.indexOf('$') > 0) {
        searchresult.question = searchresult.question + '</div>';
      }*/
      // MathJax.Hub.Queue([ 'Typeset', MathJax.Hub]);
      // MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, searchresult.question ]);
      searchresult.year = response[i].year;
      searchresult.marks = response[i].marks;
      result.push(searchresult);
    }
    return result;
  }

}
