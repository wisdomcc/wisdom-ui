import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestseriesresultComponent } from './testseriesresult.component';

describe('TestseriesresultComponent', () => {
  let component: TestseriesresultComponent;
  let fixture: ComponentFixture<TestseriesresultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestseriesresultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestseriesresultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
