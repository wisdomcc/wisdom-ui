import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionassignmentComponent } from './questionassignment.component';

describe('QuestionassignmentComponent', () => {
  let component: QuestionassignmentComponent;
  let fixture: ComponentFixture<QuestionassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
