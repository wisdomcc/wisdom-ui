import { Component, OnInit, AfterViewInit, EventEmitter, Output, Input } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-wisdomtimer',
  templateUrl: './wisdomtimer.component.html',
  styleUrls: ['./wisdomtimer.component.css']
})
export class WisdomtimerComponent implements OnInit, OnDestroy, AfterViewInit {

  displayHour: string;
  displayMinute: string;
  displaySecond: string;
  hour: number;
  minute: number;
  second: number;
  interval: any;
  @Input() examDuration: number;
  @Output() timerEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
    this.convert(this.examDuration);
  }

  ngAfterViewInit() {
    this.startInterval();
  }

  ngOnDestroy() {
    if(this.interval !== undefined && this.interval !== null) {
      clearInterval(this.interval);
    }
  }

  startInterval() {
    let that = this;
    this.interval = setInterval(function(){ 
      that.examDuration = that.examDuration - 1000;  
      if(that.examDuration <= 0) {
        clearInterval(that.interval);
        that.timerEvent.next('timer');
        //console.log("interval cleared");
      } else {
        that.convert(that.examDuration);
      }
     }, 1000);
  }

  convert(examDuration: number) {
    this.hour = Math.floor(examDuration/(60*60*1000));
    this.setDisplayHour();
    examDuration = examDuration%(60*60*1000);
    this.minute = Math.floor(examDuration/(60*1000));
    this.setDisplayMinute();
    examDuration = examDuration%(60*1000);
    this.second = Math.floor(examDuration/(1000));
    this.setDisplaySecond();
    examDuration = examDuration%(1000); 
  }

  setDisplayHour() {
    if(this.hour < 10) {
      this.displayHour = '0' + this.hour;
    } else {
      this.displayHour = '' + this.hour;
    }
  }

  setDisplayMinute() {
    if(this.minute < 10) {
      this.displayMinute = '0' + this.minute;
    } else {
      this.displayMinute = '' + this.minute;
    }
  }

  setDisplaySecond() {
    if(this.second < 10) {
      this.displaySecond = '0' + this.second;
    } else {
      this.displaySecond = '' + this.second;
    }
  }

}
