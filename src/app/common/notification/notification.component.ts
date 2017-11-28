import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {

  alertVisible: boolean;
  alertType: string;
  alertMsg: string;
  @Input() nid: string;

  constructor() { }

  ngOnInit() {
    this.alertVisible = false;
  }

  showNotification(message: string, type: string, timeout: number) {
    this.alertVisible = true;
    this.alertType = type;
    this.alertMsg = message;
    setTimeout(() => this.alertVisible = false, timeout);
  }

}
