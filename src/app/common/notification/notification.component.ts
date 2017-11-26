import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {

  alertColor: string;
  alertMsg: string;
  hideAlert: boolean;
  alertStatus: string;
  isErrorAvailable: boolean;
  @Input() nid: string;

  constructor() { }

  ngOnInit() {
    this.hideAlert = true;
  }

  showNotification(message: string, type: string, id: string) {
    // console.log('Notification for : ' + id);
    this.isErrorAvailable = false;
    if (type === 'success') {
      this.alertStatus = 'Success! ';
      this.alertColor = 'alert-success';
    } else if (type === 'error') {
      this.isErrorAvailable = true;
      this.alertStatus = 'Error! ';
      this.alertColor = 'alert-danger';
    } else {
      this.alertStatus = '';
      this.alertColor = 'alert-success';
    }
    this.alertMsg = message;
    this.hideAlert = false;
  }

  setHideAlert() {
    this.hideAlert = true;
  }

}
