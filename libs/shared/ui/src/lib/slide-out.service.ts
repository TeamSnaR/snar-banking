import { Injectable, Type, inject } from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { Overlay } from '@angular/cdk/overlay';
import { SlideOutContainerComponent } from './slide-out-container';
import { SlideOutRef } from './slide-out-ref';

@Injectable({
  providedIn: 'root',
})
export class SlideOutService {
  #dialog = inject(Dialog);
  #overlay = inject(Overlay);
  #slideOutRef: Type<SlideOutRef<any>> = SlideOutRef;

  open<TData, TResult, TComponent>(component: Type<TComponent>, data: TData) {
    const dialogRef = this.#dialog.open(component, {
      positionStrategy: this.#overlay.position().global().end(),
      panelClass: ['pointer-events-auto', 'w-screen', 'max-w-md'],
      data,
      container: SlideOutContainerComponent,
      closeOnOverlayDetachments: false,
      disableClose: true,
      providers: (dialogRef, config, container) => {
        return [
          {
            provide: this.#slideOutRef,
            useValue: new this.#slideOutRef(dialogRef, container),
          },
          {
            provide: SlideOutContainerComponent,
            useValue: container,
          },
        ];
      },
    });

    return dialogRef;
  }
}
