import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewExceptionalTaskComponent } from './view-exceptional-task.component';

describe('ViewExceptionalTaskComponent', () => {
  let component: ViewExceptionalTaskComponent;
  let fixture: ComponentFixture<ViewExceptionalTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewExceptionalTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewExceptionalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
