import { TestBed } from '@angular/core/testing';

import { DocManagerService } from './doc-manager.service';

describe('DocManagerService', () => {
  let service: DocManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
