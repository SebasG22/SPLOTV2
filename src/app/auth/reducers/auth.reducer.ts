import * as authActions from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
export type Actions = authActions.All;

export interface AuthFeatureModel  {
    auth: State;
  }


export interface State {
   verifyAuth: boolean;
   loggedIn: boolean;
  }

  const initialState: State = {
    verifyAuth: false,
    loggedIn: false,
  };

  export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
      case authActions.VERIFY_AUTH_SUCCESS: {
        return { ...state, verifyAuth: true};
      }
      case authActions.LOGIN_SUCCESS: {
        return { ...state, loggedIn: true};
      }
        default:
        return state;
    }
}


export const reducers = {
    auth: reducer,
  };

  export const selectAuthState = createFeatureSelector<AuthFeatureModel>('auth');
  export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AuthFeatureModel) => state.auth
  );

