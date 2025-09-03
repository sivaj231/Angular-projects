import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverViewComponent } from './approver-view.component';

describe('ApproverViewComponent', () => {
  let component: ApproverViewComponent;
  let fixture: ComponentFixture<ApproverViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproverViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
