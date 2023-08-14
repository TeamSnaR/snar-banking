import {
  Injectable,
  InjectionToken,
  Injector,
  Type,
  inject,
} from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';

export type UtilToastrType = 'success' | 'error' | 'warning' | 'info';
export type UtilToastrPosition =
  | 'top'
  | 'bottom'
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export type UtilToastrConfig = {
  message: string;
  title: string;
  type?: UtilToastrType;
  position?: UtilToastrPosition;
};

export type UtilToastrOverlayRef = {
  close: () => void;
};

export const UTIl_TOASTR_DEFAULT_CONFIG: UtilToastrConfig = {
  message: '',
  title: '',
};

export const UTIL_TOASTR_CONFIG = new InjectionToken<UtilToastrConfig>(
  'UI_TOASTR_DATA'
);

export type UtilToastrRegistry = Record<UtilToastrType, Type<unknown>>;

export const TOASTR_REGISTRY = new InjectionToken<UtilToastrRegistry>(
  'TOASTR_REGISTRY',
  {
    providedIn: 'root',
    factory: () => ({} as unknown as UtilToastrRegistry),
  }
);

@Injectable({
  providedIn: 'any',
})
export class UtilToastrService {
  #overlay = inject(Overlay);
  #toastrRegistry = inject(TOASTR_REGISTRY);
  createUiToastrOverlayRef(overlayRef: OverlayRef): UtilToastrOverlayRef {
    return {
      close: () => {
        overlayRef.dispose();
      },
    };
  }
  show(data: UtilToastrConfig): void {
    const portalInjector = Injector.create({
      providers: [
        {
          provide: UTIL_TOASTR_CONFIG,
          useValue: {
            ...UTIl_TOASTR_DEFAULT_CONFIG,
            ...data,
          },
        },
      ],
    });
    const toastrComponentPortal = new ComponentPortal(
      this.#toastrRegistry[data.type as unknown as UtilToastrType],
      null,
      portalInjector
    );
    const overlayRef = this.#overlay.create({
      positionStrategy: this.#overlay.position().global(),
      hasBackdrop: false,
    });

    const uiToastrOverlayRef = this.createUiToastrOverlayRef(overlayRef);
    overlayRef.attach(toastrComponentPortal);

    setTimeout(() => {
      uiToastrOverlayRef.close();
    }, 2000);
  }

  #defaultPosition: UtilToastrPosition = 'top-right';

  static successToast(data: UtilToastrConfig): UtilToastrConfig {
    return {
      ...data,
      type: 'success',
    };
  }

  static errorToast(data: UtilToastrConfig): UtilToastrConfig {
    return {
      ...data,
      type: 'error',
    };
  }

  static warningToast(data: UtilToastrConfig): UtilToastrConfig {
    return {
      ...data,
      type: 'warning',
    };
  }

  static infoToast(data: UtilToastrConfig): UtilToastrConfig {
    return {
      ...data,
      type: 'info',
    };
  }
}
