import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchHierarchyComponent } from './branch-hierarchy.component';

describe('BranchHierarchyComponent', () => {
  let component: BranchHierarchyComponent;
  let fixture: ComponentFixture<BranchHierarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchHierarchyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchHierarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
