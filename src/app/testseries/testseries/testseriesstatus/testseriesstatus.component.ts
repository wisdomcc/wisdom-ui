import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestSeriesStatus } from '../../../../models/testseries/testseries.model';

@Component({
  selector: 'app-testseriesstatus',
  templateUrl: './testseriesstatus.component.html',
  styleUrls: ['./testseriesstatus.component.css']
})
export class TestseriesstatusComponent implements OnInit {

  @Input() testSeriesStatus: TestSeriesStatus;
  @Output() changePageEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  gotoPage(page: number) {
    this.changePageEvent.next(page);
  }

}
