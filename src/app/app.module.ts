import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { Ng2TableModule, NG_TABLE_DIRECTIVES, NgTablePagingDirective } from 'ng2-table/ng2-table';
import { PaginationModule } from 'ng2-bootstrap';

import { DataService } from './data.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavigationComponent } from './navigation/navigation.component';
import { QuestionComponent } from './question/question.component';
import { OptionsComponent } from './options/options.component';
import { AttributeComponent } from './attribute/attribute.component';
import { AnswerComponent } from './answer/answer.component';
import { PreviewComponent } from './preview/preview.component';
import { CategoryComponent } from './category/category.component';
import { SubmitquestionComponent } from './submitquestion/submitquestion.component';
import { ViewquestionComponent } from './viewquestion/viewquestion.component';
import { UpdatequestionComponent } from './updatequestion/updatequestion.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';
import { RegistrationComponent } from './registration/registration.component';
import { QuestiontextComponent } from './questiontext/questiontext.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ProductsComponent } from './products/products.component';
import { TestComponent } from './test/test.component';
import { FooterComponent } from './footer/footer.component';
import { NotificationComponent } from './notification/notification.component';
import { PreviewquestionComponent } from './previewquestion/previewquestion.component';

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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }


