import * as authActions from '../actions/auth.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInformation } from '../models';
export type Actions = authActions.All;

export interface AuthFeatureModel  {
    auth: State;
  }


export interface State {
   verifyAuth: boolean;
   loggedIn: boolean;
   currentUser: UserInformation;
  }

  const initialState: State = {
    verifyAuth: false,
    loggedIn: false,
    currentUser: null,
  };

  export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
      case authActions.VERIFY_AUTH_SUCCESS: {
        return { ...state, verifyAuth: true};
      }
      case authActions.LOGIN_SUCCESS: {
        return { ...state, loggedIn: true, currentUser: action.payload};
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

