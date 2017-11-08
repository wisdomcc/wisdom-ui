import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateanswerComponent } from './updateanswer.component';

describe('UpdateanswerComponent', () => {
  let component: UpdateanswerComponent;
  let fixture: ComponentFixture<UpdateanswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateanswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateanswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
