import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionpreviewComponent } from './questionpreview.component';

describe('QuestionpreviewComponent', () => {
  let component: QuestionpreviewComponent;
  let fixture: ComponentFixture<QuestionpreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionpreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionpreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
