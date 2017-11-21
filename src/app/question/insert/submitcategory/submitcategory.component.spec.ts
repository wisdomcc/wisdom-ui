import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitcategoryComponent } from './submitcategory.component';

describe('SubmitcategoryComponent', () => {
  let component: SubmitcategoryComponent;
  let fixture: ComponentFixture<SubmitcategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitcategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitcategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
