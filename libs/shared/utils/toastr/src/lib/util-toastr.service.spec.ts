import { TestBed } from '@angular/core/testing';
import { UtilToastrService } from './util-toastr.service';

describe('UtilsToastrService', () => {
  let service: UtilToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
