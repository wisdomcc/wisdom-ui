import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TestSeriesService } from '../../../../services/testseries/testseries.service';
import { PreviewquestionComponent } from '../../../question/search/previewquestion/previewquestion.component';
import { UserService } from '../../../../services/user/user.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-assignedquestion',
  templateUrl: './assignedquestion.component.html',
  styleUrls: ['./assignedquestion.component.css']
})
export class AssignedquestionComponent implements OnInit {

  id: string;
  isDataPresent: boolean;
  @Input() imageBaseUrl: string;
  @Input() selectedTestSeriesId: any;
  @ViewChild(PreviewquestionComponent) previewQuestion: PreviewquestionComponent;
  @ViewChild(NotificationComponent) notification: NotificationComponent;

  constructor(private testSeriesService: TestSeriesService,
              private userService: UserService) { }

  ngOnInit() {
    this.id = 'assignedquestion';
    this.isDataPresent = false;
    this.searchAssignedQuestion();
  }

  searchAssignedQuestion() {
    this.testSeriesService.fetchTestSeriesQuestions(this.selectedTestSeriesId)
      .subscribe(data => {
        this.previewQuestion.data = JSON.parse(data);
        // console.log(this.previewQuestion.data);
        this.previewQuestion.onChangeTable(this.previewQuestion.config);
        if (this.previewQuestion.data.length > 0) {
          this.isDataPresent = true;
        } else {
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
