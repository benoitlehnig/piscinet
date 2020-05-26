import { TestBed } from '@angular/core/testing';

import { ShareVisitService } from './share-visit.service';

describe('ShareVisitService', () => {
  let service: ShareVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
