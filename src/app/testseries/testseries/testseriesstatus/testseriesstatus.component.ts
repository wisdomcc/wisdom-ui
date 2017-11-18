import { Component, OnInit, Input } from '@angular/core';
import { TestSeriesStatus } from '../../../../models/testseries/testseries.model';

@Component({
  selector: 'app-testseriesstatus',
  templateUrl: './testseriesstatus.component.html',
  styleUrls: ['./testseriesstatus.component.css']
})
export class TestseriesstatusComponent implements OnInit {

  @Input() testSeriesStatus: TestSeriesStatus;

  constructor() { }

  ngOnInit() {
  }

}
