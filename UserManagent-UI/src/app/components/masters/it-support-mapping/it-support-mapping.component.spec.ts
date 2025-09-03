import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItSupportMappingComponent } from './it-support-mapping.component';

describe('ItSupportMappingComponent', () => {
  let component: ItSupportMappingComponent;
  let fixture: ComponentFixture<ItSupportMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItSupportMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItSupportMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
