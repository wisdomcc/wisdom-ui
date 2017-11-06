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
      this.alertStatus = 'Success!';
      this.alertColor = 'text-success';
    } else if (type === 'error') {
      this.alertStatus = 'Error!';
      this.alertColor = 'text-danger';
    } else {
      this.alertStatus = '';
      this.alertColor = 'text-success';
    }
    this.alertMsg = message;
    this.hideAlert = false;
    setTimeout(function() {
        this.hideAlert = true;
        this.$('#' + id).addClass('hide');
      }, 2000);
  }

}
