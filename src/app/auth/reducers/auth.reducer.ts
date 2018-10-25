import * as authActions from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserProvider } from '../models';
export type Actions = authActions.All;

export interface AuthFeatureModel {
  auth: State;
}

export interface State {
  wasSessionChecked: boolean;
  userProvider: UserProvider;
  loggedIn: boolean;
}

export const initialState: State = {
  wasSessionChecked: null,
  userProvider: null,
  loggedIn: false,
};

export function reducer(state: State = initialState, action: Actions): State {

  switch (action.type) {
    case authActions.VERIFY_AUTH_SUCCESS: {
      return { ...state, verifyAuth: true };
    }
    case authActions.LOGIN_SUCCESS: {
      return { ...state, userProvider: action.payload };
    }
    case authActions.SET_VERIFY_AUTH: {
      return { ...state, loggedIn: true, verifyAuth: 'Logged' };
    }
    case authActions.LOGOUT_SUCCESS: {
      return { ...state, loggedIn: false, verifyAuth: true };
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
  (state: AuthFeatureModel) => state.auth
);
export const getAuthVerifyState = createSelector(selectAuthStatusState, (state: State) => state.verifyAuth);

