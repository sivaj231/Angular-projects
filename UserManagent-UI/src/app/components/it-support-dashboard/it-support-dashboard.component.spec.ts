import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItSupportDashboardComponent } from './it-support-dashboard.component';

describe('ItSupportDashboardComponent', () => {
  let component: ItSupportDashboardComponent;
  let fixture: ComponentFixture<ItSupportDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItSupportDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItSupportDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
