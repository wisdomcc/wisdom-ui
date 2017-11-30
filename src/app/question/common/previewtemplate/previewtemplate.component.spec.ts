import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewtemplateComponent } from './previewtemplate.component';

describe('PreviewtemplateComponent', () => {
  let component: PreviewtemplateComponent;
  let fixture: ComponentFixture<PreviewtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
