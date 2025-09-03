import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuppolicyComponent } from './auppolicy.component';

describe('AuppolicyComponent', () => {
  let component: AuppolicyComponent;
  let fixture: ComponentFixture<AuppolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuppolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuppolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
