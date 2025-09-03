import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadNcMobileComponent } from './upload-nc-mobile.component';

describe('UploadNcMobileComponent', () => {
  let component: UploadNcMobileComponent;
  let fixture: ComponentFixture<UploadNcMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadNcMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadNcMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
