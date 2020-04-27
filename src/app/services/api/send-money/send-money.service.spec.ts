import { TestBed } from '@angular/core/testing';

import { SendMoneyAPIService } from './send-money.service';

describe('SendMoneyAPIService', () => {
  let service: SendMoneyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({ });
    service = TestBed.inject(SendMoneyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
