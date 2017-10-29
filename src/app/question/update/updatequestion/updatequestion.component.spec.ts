import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatequestionComponent } from './updatequestion.component';

describe('UpdatequestionComponent', () => {
  let component: UpdatequestionComponent;
  let fixture: ComponentFixture<UpdatequestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatequestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatequestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
