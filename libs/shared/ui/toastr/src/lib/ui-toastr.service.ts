import { Injectable, InjectionToken, Injector, inject } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { SharedUiToastrComponent } from './shared-ui-toastr.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

export type UiToastrType = 'success' | 'error' | 'warning' | 'info';
export type UiToastrPosition =
  | 'top'
  | 'bottom'
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export type UiToastrConfig = {
  message: string;
  title: string;
  type?: UiToastrType;
  position?: UiToastrPosition;
};

export type UiToastrOverlayRef = {
  close: () => void;
};

export const UI_TOASTR_DEFAULT_CONFIG: UiToastrConfig = {
  message: '',
  title: '',
};

export const UI_TOASTR_CONFIG = new InjectionToken<UiToastrConfig>(
  'UI_TOASTR_DATA'
);

@Injectable({
  providedIn: 'root',
})
export class UiToastrService {
  #overlay = inject(Overlay);
  createUiToastrOverlayRef(overlayRef: OverlayRef): UiToastrOverlayRef {
    return {
      close: () => {
        overlayRef.dispose();
      },
    };
  }
  show(data: UiToastrConfig): void {
    const portalInjector = Injector.create({
      providers: [
        {
          provide: UI_TOASTR_CONFIG,
          useValue: {
            ...UI_TOASTR_DEFAULT_CONFIG,
            ...data,
          },
        },
      ],
    });
    const toastrComponentPortal = new ComponentPortal(
      SharedUiToastrComponent,
      null,
      portalInjector
    );
    const overlayRef = this.#overlay.create({
      positionStrategy: this.#overlay.position().global(),
      hasBackdrop: false,
    });

    overlayRef.backdropClick().subscribe(() => {
      console.log('backdrop clicked');
      overlayRef.dispose();
    });

    const uiToastrOverlayRef = this.createUiToastrOverlayRef(overlayRef);
    overlayRef.attach(toastrComponentPortal);

    setTimeout(() => {
      uiToastrOverlayRef.close();
    }, 5000);
  }

  #defaultPosition: UiToastrPosition = 'top-right';

  static successToast(data: UiToastrConfig): UiToastrConfig {
    return {
      ...data,
      type: 'success',
    };
  }

  static errorToast(data: UiToastrConfig): UiToastrConfig {
    return {
      ...data,
      type: 'error',
    };
  }

  static warningToast(data: UiToastrConfig): UiToastrConfig {
    return {
      ...data,
      type: 'warning',
    };
  }

  static infoToast(data: UiToastrConfig): UiToastrConfig {
    return {
      ...data,
      type: 'info',
    };
  }
}
