import { Component, ViewChild } from '@angular/core';
import { NavigationComponent } from './common/navigation/navigation.component';
import { UserService } from '../services/user/user.service';
import { WisdomUser } from '../models/user/wisdomuser.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Kunal';

  isloggedIn: WisdomUser;

  constructor(private userService: UserService) {
    userService.loggedIn$.subscribe(
      loggedIn => {
        this.isloggedIn = loggedIn;
      });
  }

  @ViewChild(NavigationComponent) navigation: NavigationComponent;

  loggedInStatus() {
    console.log(this.navigation);
    this.navigation.loggedIn = this.isloggedIn;
  }
}
