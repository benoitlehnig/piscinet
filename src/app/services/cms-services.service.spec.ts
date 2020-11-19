import { TestBed } from '@angular/core/testing';

import { CmsServicesService } from './cms-services.service';

describe('CmsServicesService', () => {
  let service: CmsServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CmsServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
