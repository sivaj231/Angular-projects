import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanypolicyComponent } from './companypolicy.component';

describe('CompanypolicyComponent', () => {
  let component: CompanypolicyComponent;
  let fixture: ComponentFixture<CompanypolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanypolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanypolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
