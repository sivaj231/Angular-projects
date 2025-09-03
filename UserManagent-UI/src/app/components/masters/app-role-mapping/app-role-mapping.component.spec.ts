import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRoleMappingComponent } from './app-role-mapping.component';

describe('AppRoleMappingComponent', () => {
  let component: AppRoleMappingComponent;
  let fixture: ComponentFixture<AppRoleMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRoleMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRoleMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
