import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionunassignmentComponent } from './questionunassignment.component';

describe('QuestionunassignmentComponent', () => {
  let component: QuestionunassignmentComponent;
  let fixture: ComponentFixture<QuestionunassignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionunassignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionunassignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
