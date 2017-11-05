import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedquestionComponent } from './linkedquestion.component';

describe('LinkedquestionComponent', () => {
  let component: LinkedquestionComponent;
  let fixture: ComponentFixture<LinkedquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
