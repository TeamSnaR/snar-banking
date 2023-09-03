import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export type NavItem = {
  label: string;
  route: string;
};
export type ShellUiNavState = {
  navItems: Array<NavItem>;
  mobileMenuTriggerState: 'hidden' | 'block';
};

const INITIAL_STATE: ShellUiNavState = {
  navItems: [
    {
      label: 'Dashboard',
      route: '/',
    },
    {
      label: 'Expenses',
      route: '/expenses',
    },
    {
      label: 'Reports',
      route: '/reports',
    },
  ],
  mobileMenuTriggerState: 'hidden',
};

@Injectable()
export class ShellUiNavStore extends ComponentStore<ShellUiNavState> {
  constructor() {
    super(INITIAL_STATE);
  }

  readonly navItems$ = this.select((state) => state.navItems);
  readonly mobileMenuTriggerState$ = this.select(
    (state) => state.mobileMenuTriggerState
  );

  readonly mobileMenuTriggerBurgerIcon$ = this.select(
    this.mobileMenuTriggerState$,
    (mobileMenuTriggerState) => {
      return mobileMenuTriggerState === 'block'
        ? { block: true, hidden: true }
        : { block: false, hidden: false };
    }
  );

  readonly mobileMenuTriggerCloseIcon$ = this.select(
    this.mobileMenuTriggerState$,
    (mobileMenuTriggerState) => {
      return mobileMenuTriggerState === 'block'
        ? { block: false, hidden: false }
        : { block: true, hidden: true };
    }
  );

  readonly openMenu = this.updater((state) => ({
    ...state,
    mobileMenuTriggerState: 'block',
  }));

  readonly closeMenu = this.updater((state) => ({
    ...state,
    mobileMenuTriggerState: 'hidden',
  }));
}
