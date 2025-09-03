import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationmodulemasterComponent } from './applicationmodulemaster.component';

describe('ApplicationmodulemasterComponent', () => {
  let component: ApplicationmodulemasterComponent;
  let fixture: ComponentFixture<ApplicationmodulemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationmodulemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationmodulemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
