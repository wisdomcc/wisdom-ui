import { Routes, RouterModule } from '@angular/router';

import { UrlSecurityService } from '../services/security/url.security.service';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import { LogoutComponent } from './user/logout/logout.component';
import { SubmitquestionComponent } from './question/insert/submitquestion/submitquestion.component';
import { ViewquestionComponent } from './question/search/viewquestion/viewquestion.component';
import { UpdatequestionComponent } from './question/update/updatequestion/updatequestion.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { HomepageComponent } from './common/homepage/homepage.component';
import { AboutusComponent } from './common/aboutus/aboutus.component';
import { ContactusComponent } from './common/contactus/contactus.component';
import { ProductsComponent } from './products/products.component';
import { SubmitanswerComponent } from './answer/insert/submitanswer/submitanswer.component';
import { UpdateanswerComponent } from './answer/update/updateanswer/updateanswer.component';
import { QuestionassignmentComponent } from './testseries/assignment/questionassignment/questionassignment.component';
import { TestseriesComponent } from './testseries/testseries/testseries/testseries.component';
import { EnrolltestseriesComponent } from './testseries/enrolltestseries/enrolltestseries.component';
import { TestseriesresultComponent } from './testseries/result/testseriesresult/testseriesresult.component';
import { SubmittestseriesComponent } from './testseries/insert/submittestseries/submittestseries.component';
import { SubmitcategoryComponent } from './question/insert/submitcategory/submitcategory.component';

const appRoutes: Routes = [
    { path: '', component: HomepageComponent, canActivate: [UrlSecurityService] },
    { path: 'submitquestion', component: SubmitquestionComponent, canActivate: [UrlSecurityService] },
    { path: 'submitanswer', component: SubmitanswerComponent, canActivate: [UrlSecurityService] },
    { path: 'updateanswer', component: UpdateanswerComponent, canActivate: [UrlSecurityService] },
    { path: 'submitcategory', component: SubmitcategoryComponent, canActivate: [UrlSecurityService] },
    { path: 'products', component: ProductsComponent, canActivate: [UrlSecurityService] },
    { path: 'profile', component: ProfileComponent,
        children: [
            { path: '', redirectTo: 'profile', pathMatch: 'full'},
            { path: 'changepassword', component: ChangepasswordComponent },
            { path: 'testseries', component: TestseriesComponent },
            { path: 'enrolltestseries', component: EnrolltestseriesComponent },
            { path: 'viewquestion', component: ViewquestionComponent },
            { path: 'testseriesresult', component: TestseriesresultComponent }
        ], canActivate: [UrlSecurityService] },
    { path: 'registration', component: RegistrationComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'contactus', component: ContactusComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'homepage', component: HomepageComponent, canActivate: [UrlSecurityService] },
    { path: 'updatequestion', component: UpdatequestionComponent, canActivate: [UrlSecurityService] },
    { path: 'viewquestion', component: ViewquestionComponent, canActivate: [UrlSecurityService] },
    { path: 'testseries', component: TestseriesComponent, canActivate: [UrlSecurityService] },
    { path: 'enrolltestseries', component: EnrolltestseriesComponent, canActivate: [UrlSecurityService] },
    { path: 'submittestseries', component: SubmittestseriesComponent, canActivate: [UrlSecurityService] },
    { path: 'testseriesresult', component: TestseriesresultComponent, canActivate: [UrlSecurityService] },
    { path: 'questionassignment', component: QuestionassignmentComponent, canActivate: [UrlSecurityService] },

   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
