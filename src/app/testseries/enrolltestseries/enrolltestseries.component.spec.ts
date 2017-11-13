import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrolltestseriesComponent } from './enrolltestseries.component';

describe('EnrolltestseriesComponent', () => {
  let component: EnrolltestseriesComponent;
  let fixture: ComponentFixture<EnrolltestseriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrolltestseriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrolltestseriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
