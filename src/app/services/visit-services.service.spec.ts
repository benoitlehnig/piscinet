import { TestBed } from '@angular/core/testing';

import { VisitServicesService } from './visit-services.service';

describe('VisitServicesService', () => {
  let service: VisitServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
