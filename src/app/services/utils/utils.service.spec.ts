import { TestBed } from '@angular/core/testing';

import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return false if text does not contain single value', () => {
    expect(service.textContains('Testing', [ 'Hello' ])).toBeFalse();
  });

  it('should return false if text does not contain all values', () => {
    expect(service.textContains('Testing', [ 'Hello', 'Test' ])).toBeFalse();
  });

  it('should return true if text does contain single value', () => {
    expect(service.textContains('Testing', [ 'Test' ])).toBeTruthy();
  });

  it('should return true if text contains all values', () => {
    expect(service.textContains('Testing', [ 'Test', 'ting' ])).toBeTruthy();
  });
});
