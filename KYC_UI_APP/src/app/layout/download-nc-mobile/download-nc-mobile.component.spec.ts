import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadNcMobileComponent } from './download-nc-mobile.component';

describe('DownloadNcMobileComponent', () => {
  let component: DownloadNcMobileComponent;
  let fixture: ComponentFixture<DownloadNcMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadNcMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadNcMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
