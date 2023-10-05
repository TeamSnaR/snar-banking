import { Injectable, Type, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root',
})
export class SlideOutService {
  #dialog = inject(Dialog);
  #overlay = inject(Overlay);

  open<TComponent, TData>(component: Type<TComponent>, data: TData) {
    return this.#dialog.open(component, {
      positionStrategy: this.#overlay.position().global().end(),
      panelClass: ['pointer-events-auto', 'w-screen', 'max-w-md'],
      data: data,
    });
  }
}
