import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadInvalidMobileComponent } from './upload-invalid-mobile.component';

describe('UploadInvalidMobileComponent', () => {
  let component: UploadInvalidMobileComponent;
  let fixture: ComponentFixture<UploadInvalidMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadInvalidMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadInvalidMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
