import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoDueComponent } from './no-due.component';

describe('NoDueComponent', () => {
  let component: NoDueComponent;
  let fixture: ComponentFixture<NoDueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoDueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoDueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
