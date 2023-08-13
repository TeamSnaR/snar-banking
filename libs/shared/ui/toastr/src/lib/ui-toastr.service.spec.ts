import { TestBed } from '@angular/core/testing';

import { UiToastrService } from './ui-toastr.service';

describe('UiToastrService', () => {
  let service: UiToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
