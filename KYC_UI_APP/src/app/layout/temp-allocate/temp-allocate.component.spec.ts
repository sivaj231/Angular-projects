import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempAllocateComponent } from './temp-allocate.component';

describe('TempAllocateComponent', () => {
  let component: TempAllocateComponent;
  let fixture: ComponentFixture<TempAllocateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempAllocateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempAllocateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
