import * as authActions from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProvider } from '../models';

import { get } from 'lodash';

export type Actions = authActions.All;


export interface AuthFeatureModel {
  auth: State;
}

export interface State {
  wasSessionChecked: boolean;
  loggedIn: boolean;
}

export const initialState: State = {
  wasSessionChecked: null,
  loggedIn: false,
};

export function reducer(state: State = initialState, action: Actions): State {

  switch (action.type) {
    case authActions.CHECK_AUTH_SESSION_SUCCESS: {
      return { ...state, wasSessionChecked: true };
    }
    case authActions.LOGIN_SUCCESS: {
      return { ...state, loggedIn: true };
    }
    case authActions.LOGOUT_SUCCESS: {
      return { ...state, loggedIn: false, wasSessionChecked: true };
    }
    default:
      return state;
  }
}


export const reducers = {
  auth: reducer,
};

export const selectAuthState = createFeatureSelector<AuthFeatureModel>('AuthFeatureModel');
export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthFeatureModel) => get(state, 'auth', null)
);
export const getAuthWasSessionChecked = createSelector(selectAuthStatusState, (state: State) => get(state, 'wasSessionChecked ', null));
export const getAuthUserIsLogged = createSelector(selectAuthStatusState, (state: State) => get(state, 'loggedIn', null));

