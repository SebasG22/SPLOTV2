import * as appActions from './app.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppPermissions } from './users/models';
export type Actions = appActions.All;

export interface AppFeatureModel  {
    app: State;
  }


export interface State {
   permissions: AppPermissions[] ;
  }

  const initialState: State = {
    permissions: null
  };

  export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
      case appActions.GET_APP_PERMISSIONS_SUCCESS: {
        return { ...state, permissions: action.payload} ;
      }
        default:
        return state;
    }
}


export const reducers = {
    auth: reducer,
  };

  export const selectAuthState = createFeatureSelector<AppFeatureModel>('AppFeatureModel');
  export const selectAuthStatusState = createSelector(
    selectAuthState,
    (state: AppFeatureModel) => state.app
  );
  export const getAppPermissions = createSelector(selectAuthStatusState, (state: State) => {
    console.warn('state', state);
    return state.permissions;
  });

