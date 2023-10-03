import { DialogModule } from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { importProvidersFrom } from '@angular/core';

export function provideSlideOut() {
  return importProvidersFrom([DialogModule, OverlayModule]);
}
