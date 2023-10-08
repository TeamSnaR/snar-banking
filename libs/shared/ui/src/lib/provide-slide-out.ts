import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function provideSlideOut() {
  return importProvidersFrom([
    DialogModule,
    OverlayModule,
    BrowserAnimationsModule,
  ]);
}
