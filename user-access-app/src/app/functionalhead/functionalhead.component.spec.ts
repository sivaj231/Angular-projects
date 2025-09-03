import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionalheadComponent } from './functionalhead.component';

describe('FunctionalheadComponent', () => {
  let component: FunctionalheadComponent;
  let fixture: ComponentFixture<FunctionalheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionalheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionalheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
