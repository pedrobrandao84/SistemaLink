import { TestBed } from '@angular/core/testing';

import { EnderecolinkService } from './enderecolink.service';

describe('EnderecolinkService', () => {
  let service: EnderecolinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnderecolinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
