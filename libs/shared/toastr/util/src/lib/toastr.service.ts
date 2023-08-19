import { Injectable, Injector, inject } from '@angular/core';
import { TOASTR_CONFIG, TOASTR_DATA, ToastrData } from './configs';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  #toastrConfig = inject(TOASTR_CONFIG);
  #overlay = inject(Overlay);
  #injector = inject(Injector);

  show(data: ToastrData): void {
    if (!this.#toastrConfig) {
      throw new Error('Toastr config is null or undefined');
    }

    const overlay = this.#overlay.create({
      hasBackdrop: false,
      positionStrategy: this.#overlay.position().global().centerHorizontally(),
    });

    const toastrComponentData = Injector.create({
      providers: [
        {
          provide: TOASTR_DATA,
          useValue: data,
        },
      ],
    });
    const toastrComponent = new ComponentPortal(
      this.#toastrConfig.template,
      null,
      toastrComponentData
    );

    overlay.attach(toastrComponent);
  }
}
