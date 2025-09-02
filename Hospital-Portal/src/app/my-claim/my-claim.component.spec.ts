import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyClaimComponent } from './my-claim.component';

describe('MyClaimComponent', () => {
  let component: MyClaimComponent;
  let fixture: ComponentFixture<MyClaimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyClaimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
