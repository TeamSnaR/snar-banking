import { Injectable, Injector, inject } from '@angular/core';
import { TOASTR_CONFIG, TOASTR_DATA, ToastrData } from './configs';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class ToastrService {
  #toastrConfig = inject(TOASTR_CONFIG);
  #overlayService = inject(Overlay);
  #toastrComponentData?: Injector;
  #toastrComponent?: ComponentPortal<unknown>;
  show(data: ToastrData): void {
    if (!this.#toastrConfig) {
      throw new Error('Toastr config is null or undefined');
    }

    const overlay = this.#overlayService.create({
      hasBackdrop: false,
      scrollStrategy: this.#overlayService.scrollStrategies.block(),
      positionStrategy: this.#overlayService
        .position()
        .global()
        .top('3rem')
        .right('2rem'),
      panelClass: ['w-full'],
    });

    this.#toastrComponentData = Injector.create({
      providers: [
        {
          provide: TOASTR_DATA,
          useValue: data,
        },
      ],
    });
    this.#toastrComponent = new ComponentPortal(
      this.#toastrConfig.template,
      null,
      this.#toastrComponentData
    );
    overlay.attach(this.#toastrComponent);

    setTimeout(() => {
      overlay.detach();
    }, 1500);
  }
}
