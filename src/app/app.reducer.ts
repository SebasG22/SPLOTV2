import * as appActions from './app.actions';
import {
  createFeatureSelector,
  createSelector,
  ActionReducerMap,
  combineReducers
} from '@ngrx/store';
import { AppPermissions } from './users/models';
import { InjectionToken } from '@angular/core';
export type Actions = appActions.All;

export interface AppFeatureModel {
  app: State;
}

export interface State {
  permissions: AppPermissions[];
}

const initialState: State = {
  permissions: null
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    case appActions.GET_APP_PERMISSIONS_SUCCESS: {
      return { ...state, permissions: action.payload };
    }
    default:
      return state;
  }
}

export const reducers = combineReducers({ app: reducer });

export const reducersToken = new InjectionToken<
  ActionReducerMap<AppFeatureModel>
>('Reducers');

export const selectAuthState = createFeatureSelector<AppFeatureModel>(
  'AppFeatureModel'
);
export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AppFeatureModel) => state.app
);
export const getAppPermissions = createSelector(
  selectAuthStatusState,
  (state: State) => {
    console.warn('state', state);
    return state.permissions;
  }
);
