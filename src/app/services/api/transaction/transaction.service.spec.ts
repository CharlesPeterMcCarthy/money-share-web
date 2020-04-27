import { TestBed } from '@angular/core/testing';

import { TransactionAPIService } from './transaction.service';

describe('TransactionAPIService', () => {
  let service: TransactionAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    service = TestBed.inject(TransactionAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
