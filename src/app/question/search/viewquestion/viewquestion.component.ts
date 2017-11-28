import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { SearchfilterComponent } from '../../../question/common/searchfilter/searchfilter.component';
import { UserService } from '../../../../services/user/user.service';
import { QuestionService } from '../../../../services/question/question.service';
import { NotificationComponent } from '../../../common/notification/notification.component';
import { PreviewquestionComponent } from '../previewquestion/previewquestion.component';

@Component({
  selector: 'app-viewquestion',
  templateUrl: './viewquestion.component.html',
  styleUrls: ['./viewquestion.component.css']
})
export class ViewquestionComponent implements OnInit {

  id: string;
  categoryData: any;
  isDataPresent: boolean;
  imageBaseUrl: string;
  @ViewChild(SearchfilterComponent) searchFilter: SearchfilterComponent;
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(PreviewquestionComponent) previewQuestion: PreviewquestionComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService) { }

  ngOnInit() {
    this.isDataPresent = false;
    this.id = 'viewquestion';
    this.imageBaseUrl = this.questionService.getImageUrl;
    this.categoryData = JSON.parse(localStorage.getItem("categoryData"));
  }

  searchQuestion(event) {
    this.questionService.viewQuestion(this.searchFilter.searchCriteria)
      .subscribe(data => {
        this.previewQuestion.data = JSON.parse(data);
        console.log(this.previewQuestion.data);
        this.previewQuestion.onChangeTable(this.previewQuestion.config);
        if (this.previewQuestion.data.length > 0) {
          this.isDataPresent = true;
        } else {
          this.isDataPresent = false;
          this.showNotification('No result for your criteria.', 'warning', 10000);
        }
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some technical issue. Please try after sometime.', 'danger', 5000);
      });
  }

  showNotification(msg: string, type: string, timeout: number) {
    this.notification.showNotification(msg, type, timeout);
  }

}
