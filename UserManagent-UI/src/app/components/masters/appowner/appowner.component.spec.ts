import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppownerComponent } from './appowner.component';

describe('AppownerComponent', () => {
  let component: AppownerComponent;
  let fixture: ComponentFixture<AppownerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppownerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppownerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
