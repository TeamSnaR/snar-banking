import { Injectable, TemplateRef, Type, inject } from '@angular/core';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';

type OpenConfig = {
  data?: {
    [key: string]: unknown;
  };
  panelClass?: string | string[];
};
@Injectable({
  providedIn: 'root',
})
export class UtilDialogService {
  // #cdkDialog = inject(Dialog);
  // open(
  //   component: ComponentType<unknown> | TemplateRef<unknown>,
  //   config?: OpenConfig
  // ) {
  //   return this.#cdkDialog.open(component, {
  //     width: '500px',
  //     height: '500px',
  //   });
  // }
}
