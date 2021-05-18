import { TestBed } from '@angular/core/testing';

import { AlugarService } from './alugar.service';

describe('AlugarService', () => {
  let service: AlugarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlugarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
