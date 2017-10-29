import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewquestionComponent } from './previewquestion.component';

describe('PreviewquestionComponent', () => {
  let component: PreviewquestionComponent;
  let fixture: ComponentFixture<PreviewquestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewquestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewquestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
