import { TestBed } from '@angular/core/testing';

import { DepositAPIService } from './deposit.service';

describe('DepositAPIService', () => {
  let service: DepositAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    service = TestBed.inject(DepositAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
