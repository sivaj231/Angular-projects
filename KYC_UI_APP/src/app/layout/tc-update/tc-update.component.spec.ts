import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TcUpdateComponent } from './tc-update.component';

describe('TcUpdateComponent', () => {
  let component: TcUpdateComponent;
  let fixture: ComponentFixture<TcUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TcUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TcUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
