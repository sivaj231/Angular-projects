import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickSvgComponent } from './tick-svg.component';

describe('TickSvgComponent', () => {
  let component: TickSvgComponent;
  let fixture: ComponentFixture<TickSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
