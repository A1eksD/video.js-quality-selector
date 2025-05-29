import { TestBed } from '@angular/core/testing';

import { VideojsQualitySelectorService } from './videojs-quality-selector.service';

describe('VideojsQualitySelectorService', () => {
  let service: VideojsQualitySelectorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideojsQualitySelectorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
