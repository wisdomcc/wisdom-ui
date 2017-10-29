import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2TableModule, NG_TABLE_DIRECTIVES, NgTablePagingDirective } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap';

import { QuestionService } from '../services/question/question.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './user/login/login.component';
import { NavigationComponent } from './common/navigation/navigation.component';
import { QuestionComponent } from './question/common/question/question.component';
import { OptionsComponent } from './question/common/options/options.component';
import { AttributeComponent } from './question/common/attribute/attribute.component';
import { AnswerComponent } from './answer/answer.component';
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

@NgModule({
  declarations: [
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
    PreviewquestionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Ng2TableModule,
    PaginationModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'submitquestion',
        component: SubmitquestionComponent
      },
      {
        path: 'products',
        component: ProductsComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: 'aboutus',
        component: AboutusComponent
      },
      {
        path: 'contactus',
        component: ContactusComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'homepage',
        component: HomepageComponent
      },
      {
        path: 'updatequestion',
        component: UpdatequestionComponent
      },
      {
        path: 'viewquestion',
        component: ViewquestionComponent
      }
    ])
  ],
  providers: [QuestionService],
  bootstrap: [AppComponent]
})
export class AppModule { }


