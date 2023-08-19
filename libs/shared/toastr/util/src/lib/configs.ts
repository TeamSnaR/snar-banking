import { InjectionToken, Type } from '@angular/core';

export type ToastrPosition =
  | 'top'
  | 'bottom'
  | 'center'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';
export type ToastrType = 'success' | 'error' | 'warning' | 'info';

export type ToastrData = {
  message: string;
  title: string;
};
export type ToastrConfig = {
  template: Type<unknown>;
  position: ToastrPosition;
};

export const TOASTR_CONFIG = new InjectionToken<ToastrConfig>(
  'TOASTR CONFIGURATION'
);
export const TOASTR_DATA = new InjectionToken<ToastrData>('TOASTR DATA');
