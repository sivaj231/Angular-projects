import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUploadDetailsComponent } from './view-upload-details.component';

describe('ViewUploadDetailsComponent', () => {
  let component: ViewUploadDetailsComponent;
  let fixture: ComponentFixture<ViewUploadDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewUploadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUploadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
