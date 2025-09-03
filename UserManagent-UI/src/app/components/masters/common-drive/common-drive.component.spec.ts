import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonDriveComponent } from './common-drive.component';

describe('CommonDriveComponent', () => {
  let component: CommonDriveComponent;
  let fixture: ComponentFixture<CommonDriveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonDriveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonDriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
