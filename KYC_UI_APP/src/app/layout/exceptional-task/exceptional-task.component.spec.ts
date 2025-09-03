import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExceptionalTaskComponent } from './exceptional-task.component';

describe('ExceptionalTaskComponent', () => {
  let component: ExceptionalTaskComponent;
  let fixture: ComponentFixture<ExceptionalTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExceptionalTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExceptionalTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
