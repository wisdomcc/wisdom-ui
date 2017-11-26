import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { SearchfilterComponent } from '../../../question/common/searchfilter/searchfilter.component';
import { UserService } from '../../../../services/user/user.service';
import { QuestionService } from '../../../../services/question/question.service';
import { NotificationComponent } from '../../../common/notification/notification.component';
import { PreviewquestionComponent } from '../previewquestion/previewquestion.component';
import { SearchResult } from '../../../../models/question/searchresult.model';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css']
})
export class ViewquestionComponent implements OnInit {

  id: string;
  categoryData: any;
  isDataPresent: boolean;
  @ViewChild(SearchfilterComponent) searchFilter: SearchfilterComponent;
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(PreviewquestionComponent) previewQuestion: PreviewquestionComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.isDataPresent = false;
    this.id = 'viewquestion';
    this.categoryData = JSON.parse(localStorage.getItem("categoryData"));
  }

  searchQuestion() {
    this.questionService.viewQuestion(this.searchFilter.searchCriteria)
      .subscribe(data => {
        this.previewQuestion.data = JSON.parse(data);
        console.log(this.previewQuestion.data);
        this.previewQuestion.onChangeTable(this.previewQuestion.config);
        if (this.previewQuestion.data.length > 0) {
          this.isDataPresent = true;
          this.notification.hideAlert = true;
        } else {
          this.isDataPresent = false;
          this.showNotification('No result for your criteria.', 'status');
        }
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some technical issue. Please try after sometime.', 'error');
      });
  }

  /*public getSearchResult(response: QuestionModel[]): Array<SearchResult> {
    const result = [];
    for (let i = 0; i < response.length; i++) {
      const searchresult = new SearchResult();
      /*if (response[i].question.indexOf('$') > 0) {
        searchresult.question = '<div id="mathjax">Q) ' + response[i].question + '<br/><br/>';
      } else {
        searchresult.question = 'Q) ' + response[i].question + '<br/><br/>';
      }//
      searchresult.question = 'Q) ' + response[i].question;
      if (response[i].options.type !== 'NoOption') {
        searchresult.options = [];
        for (let j = 0; j < response[i].options.option.length; j++) {
          searchresult.options.push((+j + 1) + ') ' + response[i].options.option[j]);
        }
      }
      /*if (response[i].question.indexOf('$') > 0) {
        searchresult.question = searchresult.question + '</div>';
      }//
      // MathJax.Hub.Queue([ 'Typeset', MathJax.Hub]);
      // MathJax.Hub.Queue([ 'Typeset', MathJax.Hub, searchresult.question ]);
      searchresult.year = response[i].year;
      searchresult.marks = response[i].marks;
      result.push(searchresult);
    }
    return result;
  }*/

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}
