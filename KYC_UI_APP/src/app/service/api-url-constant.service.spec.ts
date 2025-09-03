import { TestBed } from '@angular/core/testing';

import { ApiUrlConstantService } from './api-url-constant.service';

describe('ApiUrlConstantService', () => {
  let service: ApiUrlConstantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiUrlConstantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
