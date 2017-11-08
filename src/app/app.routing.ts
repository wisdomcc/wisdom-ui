import { Routes, RouterModule } from '@angular/router';

import { UrlSecurityService } from '../services/security/url.security.service';
import { LoginComponent } from './user/login/login.component';
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

const appRoutes: Routes = [
    { path: '', component: HomepageComponent, canActivate: [UrlSecurityService] },
    { path: 'submitquestion', component: SubmitquestionComponent, canActivate: [UrlSecurityService] },
    { path: 'submitanswer', component: SubmitanswerComponent, canActivate: [UrlSecurityService] },
    { path: 'updateanswer', component: UpdateanswerComponent, canActivate: [UrlSecurityService] },
    { path: 'products', component: ProductsComponent, canActivate: [UrlSecurityService] },
    { path: 'registration', component: RegistrationComponent },
    { path: 'aboutus', component: AboutusComponent },
    { path: 'contactus', component: ContactusComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'homepage', component: HomepageComponent, canActivate: [UrlSecurityService] },
    { path: 'updatequestion', component: UpdatequestionComponent, canActivate: [UrlSecurityService] },
    { path: 'viewquestion', component: ViewquestionComponent, canActivate: [UrlSecurityService] },

   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
