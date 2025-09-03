import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReAllocateComponent } from './re-allocate.component';

describe('ReAllocateComponent', () => {
  let component: ReAllocateComponent;
  let fixture: ComponentFixture<ReAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
