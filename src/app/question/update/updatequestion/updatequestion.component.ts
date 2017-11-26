import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionModel } from '../../../../models/question/question.model';
import { SearchfilterComponent } from '../../../question/common/searchfilter/searchfilter.component';
import { SearchCriteria } from '../../../../models/question/searchcriteria.model';
import { QuestionElementProperty } from '../../../../models/question/qeproperty.model';
import { QuestionService } from '../../../../services/question/question.service';
import { UserService } from '../../../../services/user/user.service';
import { UtilityService } from '../../../../services/utility/utility.service';
import { NotificationComponent } from '../../../common/notification/notification.component';

@Component({
  selector: 'app-updatequestion',
  templateUrl: './updatequestion.component.html',
  styleUrls: ['./updatequestion.component.css']
})
export class UpdatequestionComponent implements OnInit {

  id: string;
  hideSubmitPreviewButton: boolean;
  qeProperty: QuestionElementProperty[];
  questionModels: QuestionModel[];
  rightImagePath: string;
  downImagePath: string;
  isDataPresent: boolean;
  @ViewChild(NotificationComponent) notification: NotificationComponent;
  @ViewChild(SearchfilterComponent) searchFilter: SearchfilterComponent;

  constructor(private questionService: QuestionService,
              private userService: UserService,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.id = 'updatequestion';
    this.getDataFromLocalStorage();
    this.utilityService.setStringDataToLocalStorage('page', this.id);
    this.rightImagePath = '../../assets/images/right.png';
    this.downImagePath = '../../assets/images/down.png';
  }

  getDataFromLocalStorage() {
    if(this.utilityService.getStringDataFromLocalStorage('page') === this.id) {
      this.questionModels = this.utilityService.getJsonDataFromLocalStorage('questionModels');
      this.qeProperty = this.utilityService.getJsonDataFromLocalStorage('qeProperty');
      this.hideSubmitPreviewButton = this.utilityService.getBooleanDataFromLocalStorage('hideSubmitPreviewButton');
      this.isDataPresent = this.utilityService.getBooleanDataFromLocalStorage('isDataPresent');
    } else {
      this.removeDataFromLocalStorage();
      this.questionModels = [];
      this.qeProperty = [];
      this.hideSubmitPreviewButton = true;
      this.isDataPresent = false;
    }
  }

  removeDataFromLocalStorage() {
    let keys: string[] = [];
    keys.push('questionModels');
    keys.push('qeProperty');
    keys.push('hideSubmitPreviewButton');
    keys.push('linkedQeProperty');
    keys.push('isDataPresent');
    this.utilityService.removeMultipleDataFromLocalStorage(keys);
  }

  searchQuestion(event) {
    this.questionService.viewQuestion(this.searchFilter.searchCriteria)
    .subscribe(
      data => {
        this.questionModels = JSON.parse(data);
        if (this.questionModels.length > 0) {
          this.isDataPresent = true;
          this.qeProperty = [];
          this.hideSubmitPreviewButton = false;
          for (let i = 0; i < data.length; i++) {
            this.qeProperty.push(new QuestionElementProperty(this.rightImagePath));
          }
          this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
          this.utilityService.setJsonDataToLocalStorage('qeProperty', this.qeProperty);
          this.utilityService.setBooleanDataToLocalStorage('isDataPresent', this.isDataPresent);
          this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
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
      }
    );
  }

  expandCollapse(index: number) {
    this.qeProperty[index].collapse = this.qeProperty[index].collapse === true ? false : true;
    this.qeProperty[index].image = this.qeProperty[index].image === this.rightImagePath ? this.downImagePath : this.rightImagePath;
    this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
    this.utilityService.setJsonDataToLocalStorage('qeProperty', this.qeProperty);
  }

  removeQuestion(index: number) {
    if (this.questionModels.length === 1) {
      this.hideSubmitPreviewButton = true;
    }
    this.questionModels.splice(index, 1);
    this.qeProperty.splice(index, 1);
    this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
    this.utilityService.setJsonDataToLocalStorage('qeProperty', this.qeProperty);
    this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
  }

  submitQuestions() {
    this.utilityService.setJsonDataToLocalStorage('questionModels', this.questionModels);
    this.utilityService.setJsonDataToLocalStorage('qeProperty', this.qeProperty);
    this.utilityService.setBooleanDataToLocalStorage('hideSubmitPreviewButton', this.hideSubmitPreviewButton);
    this.questionService.updateQuestionModels(this.questionModels)
    .subscribe(
      data => {
        this.showNotification('Questions inserted successfully in database.', 'success');
        this.hideSubmitPreviewButton = true;
        this.questionModels = [];
        this.qeProperty = [];
        this.isDataPresent = false;
        this.removeDataFromLocalStorage();
      },
      error => {
        if (error.status === 401) {
          this.userService.logout();
        }
        this.showNotification('Some error occured while inserting questions in database. Please retry.', 'error');
      }
    );
  }

  showNotification(msg: string, type: string) {
    this.notification.showNotification(msg, type, this.id);
  }

}
