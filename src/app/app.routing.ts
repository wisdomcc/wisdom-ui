import { Routes, RouterModule } from '@angular/router';

import { UrlSecurityService } from '../services/security/url.security.service';
import { LoginComponent } from './user/login/login.component';
import { SubmitquestionComponent } from './question/insert/submitquestion/submitquestion.component';
import { ViewquestionComponent } from './question/search/viewquestion/viewquestion.component';
import { UpdatequestionComponent } from './question/update/updatequestion/updatequestion.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { HomepageComponent } from './common/homepage/homepage.component';
import { AboutusComponent } from './common/aboutus/aboutus.component';
import { ContactusComponent } from './common/contactus/contactus.component';
import { ProductsComponent } from './products/products.component';

const appRoutes: Routes = [
    { path: 'submitquestion', component: SubmitquestionComponent, canActivate: [UrlSecurityService] },
    { path: 'products', component: ProductsComponent, canActivate: [UrlSecurityService] },
    { path: 'registration', component: RegistrationComponent },
    { path: 'aboutus', component: AboutusComponent, canActivate: [UrlSecurityService] },
    { path: 'contactus', component: ContactusComponent, canActivate: [UrlSecurityService] },
    { path: 'login', component: LoginComponent },
    { path: 'homepage', component: HomepageComponent, canActivate: [UrlSecurityService] },
    { path: 'updatequestion', component: UpdatequestionComponent, canActivate: [UrlSecurityService] },
    { path: 'viewquestion', component: ViewquestionComponent, canActivate: [UrlSecurityService] },

   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);