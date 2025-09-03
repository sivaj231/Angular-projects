import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationmasterComponent } from './applicationmaster.component';

describe('ApplicationmasterComponent', () => {
  let component: ApplicationmasterComponent;
  let fixture: ComponentFixture<ApplicationmasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationmasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
