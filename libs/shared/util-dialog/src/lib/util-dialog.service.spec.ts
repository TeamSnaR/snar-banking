import { TestBed } from '@angular/core/testing';

import { UtilDialogService } from './util-dialog.service';

describe('UtilDialogService', () => {
  let service: UtilDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
