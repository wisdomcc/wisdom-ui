import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WisdomUser } from '../../../models/user/wisdomuser.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() loggedIn: WisdomUser;
  constructor(private router: Router) {}

  ngOnInit() {
    this.loggedIn = new WisdomUser(false, false, '', false, '', false, 0, '');
  }

  logout() {
    this.loggedIn = new WisdomUser(false, false, '', false, '', false, 0, '');
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
