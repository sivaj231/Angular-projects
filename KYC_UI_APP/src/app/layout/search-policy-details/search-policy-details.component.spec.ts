import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPolicyDetailsComponent } from './search-policy-details.component';

describe('SearchPolicyDetailsComponent', () => {
  let component: SearchPolicyDetailsComponent;
  let fixture: ComponentFixture<SearchPolicyDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPolicyDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPolicyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
