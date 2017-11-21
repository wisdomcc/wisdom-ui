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
  @Input() nid: string;

  constructor() { }

  ngOnInit() {
    this.hideAlert = true;
  }

  showNotification(message: string, type: string, id: string) {
    // console.log('Notification for : ' + id);
    setTimeout(function() {
      this.hideAlert = true;
      this.$('#' + id).removeClass('hide');
    });
    if (type === 'success') {
      this.alertStatus = 'Success! ';
      this.alertColor = 'alert-success';
    } else if (type === 'error') {
      this.alertStatus = 'Error! ';
      this.alertColor = 'alert-danger';
    } else {
      this.alertStatus = '';
      this.alertColor = 'alert-success';
    }
    this.alertMsg = message;
    this.hideAlert = false;
    if (type === 'success' || type === 'error') {
      setTimeout(function() {
        this.hideAlert = true;
        this.$('#' + id).addClass('hide');
      }, 2000);
    }
  }

}
