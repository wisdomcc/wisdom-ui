import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WisdomtimerComponent } from './wisdomtimer.component';

describe('WisdomtimerComponent', () => {
  let component: WisdomtimerComponent;
  let fixture: ComponentFixture<WisdomtimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WisdomtimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WisdomtimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
