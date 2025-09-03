import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadInvalidMobileComponent } from './download-invalid-mobile.component';

describe('DownloadInvalidMobileComponent', () => {
  let component: DownloadInvalidMobileComponent;
  let fixture: ComponentFixture<DownloadInvalidMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadInvalidMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadInvalidMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
