import { TestBed } from '@angular/core/testing';

import { PageflowServiceService } from './pageflow-service.service';

describe('PageflowServiceService', () => {
  let service: PageflowServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageflowServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
