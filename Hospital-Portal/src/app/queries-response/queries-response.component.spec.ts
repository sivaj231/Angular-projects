import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QueriesResponseComponent } from './queries-response.component';

describe('QueriesResponseComponent', () => {
  let component: QueriesResponseComponent;
  let fixture: ComponentFixture<QueriesResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QueriesResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QueriesResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
