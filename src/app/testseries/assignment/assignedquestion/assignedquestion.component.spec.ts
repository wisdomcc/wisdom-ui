import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedquestionComponent } from './assignedquestion.component';

describe('AssignedquestionComponent', () => {
  let component: AssignedquestionComponent;
  let fixture: ComponentFixture<AssignedquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
