import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitanswerComponent } from './submitanswer.component';

describe('SubmitanswerComponent', () => {
  let component: SubmitanswerComponent;
  let fixture: ComponentFixture<SubmitanswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitanswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
