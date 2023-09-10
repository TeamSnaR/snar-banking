import { AnimationEvent } from '@angular/animations';
import { DialogRef } from '@angular/cdk/dialog';
import { ComponentType, Portal } from '@angular/cdk/portal';
import { EventEmitter, Injectable, InjectionToken, Type } from '@angular/core';
import { Subject, filter, take } from 'rxjs';
import { AfterViewInit } from '@angular/core';
import { UtilDialogContainerComponent } from './util-dialog-container.component';

export interface IAnimatedDialogConfig {
  animationStateChanged: EventEmitter<AnimationEvent>;
  startExitAnimation: () => void;
}

@Injectable({
  providedIn: 'root',
})
export class UtilDialogRef {
  setDialogRef(ref: DialogRef<unknown, UtilDialogContainerComponent>) {
    this.#dialogRef = ref;

    this.#dialogRef.backdropClick.pipe(take(1)).subscribe(() => this.close());
  }
  private _beforeClose = new Subject<void>();
  private _afterClosed = new Subject<void>();
  #dialogRef: DialogRef<unknown, UtilDialogContainerComponent> | undefined;

  close() {
    if (!this.#dialogRef) {
      throw new Error('DialogRef not found. Make sure to call setDialogRef()');
    }

    let componentInstance: IAnimatedDialogConfig | undefined = this.#dialogRef
      .componentInstance as IAnimatedDialogConfig;

    if (!componentInstance) {
      throw new Error('Component instance not found');
    }

    componentInstance.animationStateChanged
      .pipe(
        filter((event) => event.phaseName === 'start'),
        take(1)
      )
      .subscribe(() => {
        this._beforeClose.next();
        this._beforeClose.complete();
        this.#dialogRef?.overlayRef.detachBackdrop();
      });

    // Listen for animation 'done' events
    componentInstance.animationStateChanged
      .pipe(
        filter(
          (event) => event.phaseName === 'done' && event.toState === 'closed'
        ),
        take(1)
      )
      .subscribe(() => {
        this.#dialogRef?.close();
        this._afterClosed.next();
        this._afterClosed.complete();

        // Make sure to also clear the reference to the
        // component instance to avoid memory leaks
        componentInstance = undefined;
      });

    // Start exit animation
    componentInstance.startExitAnimation();

    /// reference: https://blog.thoughtram.io/angular/2017/11/27/custom-overlays-with-angulars-cdk-part-two.html
  }

  beforeClose() {
    return this._beforeClose.asObservable();
  }

  afterClosed() {
    return this._afterClosed.asObservable();
  }
}
