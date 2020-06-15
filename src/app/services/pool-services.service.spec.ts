import { TestBed } from '@angular/core/testing';

import { PoolServicesService } from './pool-services.service';

describe('PoolServicesService', () => {
  let service: PoolServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoolServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
