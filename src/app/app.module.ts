import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { Ng2TableModule, NG_TABLE_DIRECTIVES, NgTablePagingDirective } from 'ng2-table';
import { PaginationModule, TypeaheadModule, TypeaheadDirective, DatepickerModule } from 'ngx-bootstrap';
import { PositioningService } from 'ngx-bootstrap';
import { AccordionModule } from 'ngx-bootstrap';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap';

import { QuestionService } from '../services/question/question.service';
import { UserService } from '../services/user/user.service';
import { UrlSecurityService } from '../services/security/url.security.service';
import { EmailService } from '../services/email/email.service';
import { AnswerService } from '../services/answer/answer.service';
import { TestSeriesService } from '../services/testseries/testseries.service';
import { UtilityService } from '../services/utility/utility.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { QuestionComponent } from './question/common/question/question.component';
import { OptionsComponent } from './question/common/options/options.component';
import { AttributeComponent } from './question/common/attribute/attribute.component';
import { AnswerComponent } from './answer/common/answer/answer.component';
import { PreviewComponent } from './question/common/preview/preview.component';
import { CategoryComponent } from './question/common/category/category.component';
import { SubmitquestionComponent } from './question/insert/submitquestion/submitquestion.component';
import { ViewquestionComponent } from './question/search/viewquestion/viewquestion.component';
import { UpdatequestionComponent } from './question/update/updatequestion/updatequestion.component';
import { UpdatecategoryComponent } from './question/update/updatecategory/updatecategory.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { QuestiontextComponent } from './question/common/questiontext/questiontext.component';
import { HomepageComponent } from './common/homepage/homepage.component';
import { AboutusComponent } from './common/aboutus/aboutus.component';
import { ContactusComponent } from './common/contactus/contactus.component';
import { ProductsComponent } from './products/products.component';
import { TestComponent } from './testseries/test.component';
import { FooterComponent } from './common/footer/footer.component';
import { NotificationComponent } from './common/notification/notification.component';
import { PreviewquestionComponent } from './question/search/previewquestion/previewquestion.component';
import { LogoutComponent } from './user/logout/logout.component';
import { ParagraphComponent } from './question/common/paragraph/paragraph.component';
import { LinkedquestionComponent } from './question/common/linkedquestion/linkedquestion.component';
import { AnspreviewComponent } from './answer/insert/anspreview/anspreview.component';
import { SubmitanswerComponent } from './answer/insert/submitanswer/submitanswer.component';
import { UpdateanswerComponent } from './answer/update/updateanswer/updateanswer.component';
import { QuestionassignmentComponent } from './testseries/assignment/questionassignment/questionassignment.component';
import { QuestionpreviewComponent } from './testseries/assignment/questionpreview/questionpreview.component';
import { TestseriespreviewComponent } from './testseries/testseries/testseriespreview/testseriespreview.component';
import { TestseriesstatusComponent } from './testseries/testseries/testseriesstatus/testseriesstatus.component';
import { SubmittestseriesComponent } from './testseries/insert/submittestseries/submittestseries.component';
import { TestseriesComponent } from './testseries/testseries/testseries/testseries.component';
import { TestseriesresultComponent } from './testseries/result/testseriesresult/testseriesresult.component';
import { EnrolltestseriesComponent } from './testseries/enrolltestseries/enrolltestseries.component';
import { SubmitcategoryComponent } from './question/insert/submitcategory/submitcategory.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import { SearchfilterComponent } from './question/common/searchfilter/searchfilter.component';
import { CustomFilterPipe } from './question/common/searchfilter/customfilter/CustomFilterPipe';
import { PreviewtemplateComponent } from './question/common/previewtemplate/previewtemplate.component';
import { AnswertemplateComponent } from './answer/common/answertemplate/answertemplate.component';
import { WisdomtimerComponent } from './timer/wisdomtimer/wisdomtimer.component';
import { QuestionunassignmentComponent } from './testseries/assignment/questionunassignment/questionunassignment.component';
import { TestseriesassignmentComponent } from './testseries/assignment/testseriesassignment/testseriesassignment.component';
import { AssignedquestionComponent } from './testseries/assignment/assignedquestion/assignedquestion.component'

@NgModule({
  declarations: [
    CustomFilterPipe,
    AppComponent,
    LoginComponent,
    NavigationComponent,
    QuestionComponent,
    OptionsComponent,
    AttributeComponent,
    AnswerComponent,
    PreviewComponent,
    CategoryComponent,
    SubmitquestionComponent,
    ViewquestionComponent,
    UpdatequestionComponent,
    UpdatecategoryComponent,
    RegistrationComponent,
    QuestiontextComponent,
    HomepageComponent,
    AboutusComponent,
    ContactusComponent,
    ProductsComponent,
    TestComponent,
    FooterComponent,
    NotificationComponent,
    PreviewquestionComponent,
    LogoutComponent,
    ParagraphComponent,
    LinkedquestionComponent,
    AnspreviewComponent,
    SubmitanswerComponent,
    UpdateanswerComponent,
    QuestionassignmentComponent,
    QuestionpreviewComponent,
    TestseriespreviewComponent,
    TestseriesstatusComponent,
    SubmittestseriesComponent,
    TestseriesComponent,
    TestseriesresultComponent,
    EnrolltestseriesComponent,
    SubmitcategoryComponent,
    ProfileComponent,
    ChangepasswordComponent,
    SearchfilterComponent,
    PreviewtemplateComponent,
    AnswertemplateComponent,
    WisdomtimerComponent,
    QuestionunassignmentComponent,
    TestseriesassignmentComponent,
    AssignedquestionComponent
  ],
  imports: [
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    AccordionModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2TableModule,
    routing,
    PaginationModule.forRoot()
  ],
  providers: [
    PositioningService,
    QuestionService,
    TestSeriesService,
    UserService,
    UrlSecurityService,
    EmailService,
    AnswerService,
    UtilityService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


