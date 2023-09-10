import {
  EnvironmentInjector,
  Injectable,
  Injector,
  Type,
  createComponent,
  inject,
} from '@angular/core';
import { Dialog } from '@angular/cdk/dialog';
import { UtilDialogRef } from './util-dialog-ref.service';
import { UtilDialogContainerComponent } from './util-dialog-container.component';
import { GlobalPositionStrategy } from '@angular/cdk/overlay';

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
  #dialog = inject(Dialog);
  open(component: Type<unknown>) {
    const utilDialogRef = new UtilDialogRef();

    const ref = this.#dialog.open(UtilDialogContainerComponent, {
      positionStrategy: new GlobalPositionStrategy()
        .centerHorizontally()
        .right('0'),
      hasBackdrop: true,
      backdropClass: ['bg-black', 'bg-opacity-50'],
      data: {
        title: 'Create new expense',
        content: {
          component,
          contentData: {
            text: 'Hello world',
          },
        },
      },
      disableClose: true,
      injector: Injector.create({
        providers: [
          {
            provide: UtilDialogRef,
            useValue: utilDialogRef,
          },
        ],
      }),
    });
    utilDialogRef.setDialogRef(ref);

    return utilDialogRef;
  }
}
