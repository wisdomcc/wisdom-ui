import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnspreviewComponent } from './anspreview.component';

describe('AnspreviewComponent', () => {
  let component: AnspreviewComponent;
  let fixture: ComponentFixture<AnspreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnspreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnspreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
