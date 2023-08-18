import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export type NavItem = {
  label: string;
  route: string;
};
export type ShellUiNavState = {
  navItems: Array<NavItem>;
};

const INITIAL_STATE = {
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
};

@Injectable()
export class ShellUiNavStore extends ComponentStore<ShellUiNavState> {
  constructor() {
    super(INITIAL_STATE);
  }

  readonly navItems$ = this.select((state) => state.navItems);
}
