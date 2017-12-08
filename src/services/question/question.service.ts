import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, RequestOptionsArgs, Headers } from '@angular/http';
import { QuestionModel } from '../../models/question/question.model';
import { Category } from '../../models/question/question.model';
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
  insertCategoryUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/insertcategory';
  updateQuestionUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/update';
  uploadImageUrl = window.location.protocol + '//' + window.location.hostname + ':8080' + '/question/uploadImage';
  getImageUrl = 'http://wisdomcc.s3-website.us-east-2.amazonaws.com/';

  constructor(private http: Http, private userService: UserService) {
  }

  previewQuestion(questionModel: QuestionModel) {
    if(questionModel.question !== undefined && questionModel.question !== null
      && questionModel.question !== '') {
        MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, questionModel.question ]);
    }
    if (questionModel.options.type !== 'NoOption') {
      if(questionModel.options !== undefined && questionModel.options !== null
        && questionModel.options.option !== undefined && questionModel.options.option !== null)
      for (let i = 0; i < questionModel.options.option.length; i++) {
        MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, questionModel.options.option[i] ]);
      }
    }
  }

  fetchCategoryDetails() {
    return this.http.get(this.categoryUrl, {withCredentials: true})
      .map((res: Response) => res.text());
  }

  insertCategory(category: Category) {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers, withCredentials: true });
    return this.http.post(this.insertCategoryUrl, category, options)
      .map((res: Response) => res.text());
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

  uploadImage(questionImage: any, id: string, type: string) {
    const formData = new FormData();
    formData.append('file', questionImage);
    formData.append('questionid', id);
    formData.append('type', type);
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

  validate(questionModels: QuestionModel[]): string {
    let errorMsg = '';
    questionModels.forEach(function(question) {
      if (question.question.trim() === '') {
        errorMsg = 'Question should not be empty. For QuestionId : ' + question.id;
        return errorMsg;
      }
      if (question.options.type === 'Text' &&
         question.options.option.length === 0) {
          errorMsg = 'Options Text is not added. For QuestionId : ' + question.id;
          return errorMsg;
      }
      if (question.options.type === 'Image' &&
          question.options.imagePath.length === 0) {
          errorMsg = 'Options Image is not added. For QuestionId : ' + question.id;
          return errorMsg;
      }
      if (question.relatedTo.exam.length === 0) {
        errorMsg = 'Related To is not added. For QuestionId : ' + question.id;
        return errorMsg;
      }
      if (question.marks === '') {
        errorMsg = 'Marks is not added. For QuestionId : ' + question.id;
        return errorMsg;
      }
      if (question.year === '') {
        errorMsg = 'Year is not added. For QuestionId : ' + question.id;
        return errorMsg;
      }
      if(question.linkedQuestions !== undefined && question.linkedQuestions !== null) {
        question.linkedQuestions.forEach(function(linkedQuestion) {
          if (linkedQuestion.question.trim() === '') {
            errorMsg = 'Question should not be empty. For Linked QuestionId : ' + linkedQuestion.id;
            return errorMsg;
          }
          if (linkedQuestion.options.type === 'Text' &&
              linkedQuestion.options.option.length === 0) {
              errorMsg = 'Options Text is not added. For Linked QuestionId : ' + linkedQuestion.id;
              return errorMsg;
          }
          if (linkedQuestion.options.type === 'Image' &&
              linkedQuestion.options.imagePath.length === 0) {
              errorMsg = 'Options Image is not added. For Linked QuestionId : ' + linkedQuestion.id;
              return errorMsg;
          }
          if (linkedQuestion.marks === '') {
            errorMsg = 'Marks is not added. For Linked QuestionId : ' + linkedQuestion.id;
            return errorMsg;
          }
        });
      }
    });
    return errorMsg;
  }

}
