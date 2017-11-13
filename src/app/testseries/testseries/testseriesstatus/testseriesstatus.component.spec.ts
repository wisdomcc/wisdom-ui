import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestseriesstatusComponent } from './testseriesstatus.component';

describe('TestseriesstatusComponent', () => {
  let component: TestseriesstatusComponent;
  let fixture: ComponentFixture<TestseriesstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestseriesstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestseriesstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
