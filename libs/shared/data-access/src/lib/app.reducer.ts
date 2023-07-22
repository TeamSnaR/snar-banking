import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  router: RouterReducerState<any>;
}

export const appReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};
