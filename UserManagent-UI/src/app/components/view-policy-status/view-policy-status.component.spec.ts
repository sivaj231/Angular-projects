import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPolicyStatusComponent } from './view-policy-status.component';

describe('ViewPolicyStatusComponent', () => {
  let component: ViewPolicyStatusComponent;
  let fixture: ComponentFixture<ViewPolicyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewPolicyStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPolicyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
