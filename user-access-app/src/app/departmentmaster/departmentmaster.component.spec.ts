import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentmasterComponent } from './departmentmaster.component';

describe('DepartmentmasterComponent', () => {
  let component: DepartmentmasterComponent;
  let fixture: ComponentFixture<DepartmentmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
