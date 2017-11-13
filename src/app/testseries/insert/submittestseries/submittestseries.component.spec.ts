import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmittestseriesComponent } from './submittestseries.component';

describe('SubmittestseriesComponent', () => {
  let component: SubmittestseriesComponent;
  let fixture: ComponentFixture<SubmittestseriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmittestseriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmittestseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
