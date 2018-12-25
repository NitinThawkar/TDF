import { TestBed, inject } from '@angular/core/testing';

import { CustomPrelodingService } from './custom-preloding.service';

describe('CustomPrelodingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomPrelodingService]
    });
  });

  it('should be created', inject([CustomPrelodingService], (service: CustomPrelodingService) => {
    expect(service).toBeTruthy();
  }));
});
