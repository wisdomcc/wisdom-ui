import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswertemplateComponent } from './answertemplate.component';

describe('AnswertemplateComponent', () => {
  let component: AnswertemplateComponent;
  let fixture: ComponentFixture<AnswertemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswertemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswertemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
