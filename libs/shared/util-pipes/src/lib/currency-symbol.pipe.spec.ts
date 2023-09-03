import { TestBed } from '@angular/core/testing';
import { CurrencySymbolPipe } from './currency-symbol.pipe';
import { LOCALE_ID } from '@angular/core';

describe('CurrencySymbolPipe', () => {
  let pipe: CurrencySymbolPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrencySymbolPipe,
        { provide: LOCALE_ID, useValue: 'en-GB' },
      ],
    });
    pipe = TestBed.inject(CurrencySymbolPipe);
    TestBed.inject(LOCALE_ID);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
