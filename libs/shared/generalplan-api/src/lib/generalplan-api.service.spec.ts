import { TestBed } from '@angular/core/testing';

import { GeneralplanApiService } from './generalplan-api.service';

describe('GeneralplanApiService', () => {
  let service: GeneralplanApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralplanApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
