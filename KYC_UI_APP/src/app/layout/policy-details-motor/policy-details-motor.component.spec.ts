import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyDetailsMotorComponent } from './policy-details-motor.component';

describe('PolicyDetailsMotorComponent', () => {
  let component: PolicyDetailsMotorComponent;
  let fixture: ComponentFixture<PolicyDetailsMotorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolicyDetailsMotorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyDetailsMotorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
