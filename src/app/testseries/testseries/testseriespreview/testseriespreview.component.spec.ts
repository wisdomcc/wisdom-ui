import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestseriespreviewComponent } from './testseriespreview.component';

describe('TestseriespreviewComponent', () => {
  let component: TestseriespreviewComponent;
  let fixture: ComponentFixture<TestseriespreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestseriespreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestseriespreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
