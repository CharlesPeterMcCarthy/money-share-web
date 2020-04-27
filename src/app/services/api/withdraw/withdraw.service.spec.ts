import { TestBed } from '@angular/core/testing';

import { WithdrawAPIService } from './withdraw.service';

describe('WithdrawAPIService', () => {
  let service: WithdrawAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    service = TestBed.inject(WithdrawAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
