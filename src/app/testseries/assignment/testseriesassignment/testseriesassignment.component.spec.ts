import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestseriesassignmentComponent } from './testseriesassignment.component';

describe('TestseriesassignmentComponent', () => {
  let component: TestseriesassignmentComponent;
  let fixture: ComponentFixture<TestseriesassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestseriesassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestseriesassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
