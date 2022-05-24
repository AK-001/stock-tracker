import { TestBed } from '@angular/core/testing';

import { EndpointconfigService } from './endpointconfig.service';

describe('EndpointconfigService', () => {
  let service: EndpointconfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EndpointconfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
