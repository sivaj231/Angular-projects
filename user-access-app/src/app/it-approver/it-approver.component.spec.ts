import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItApproverComponent } from './it-approver.component';

describe('ItApproverComponent', () => {
  let component: ItApproverComponent;
  let fixture: ComponentFixture<ItApproverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItApproverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
