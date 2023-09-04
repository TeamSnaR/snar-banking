import { getCurrencySymbol } from '@angular/common';
import { LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'currencySymbol',
  standalone: true,
})
export class CurrencySymbolPipe implements PipeTransform {
  protected locale = inject(LOCALE_ID);
  transform(value: string | null, ...args: unknown[]): string {
    return getCurrencySymbol(value ?? '', 'narrow', this.locale);
  }
}
