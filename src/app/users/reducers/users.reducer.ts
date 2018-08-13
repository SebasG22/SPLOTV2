import * as userActions from '../actions/users.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInformation } from '../models';
export type Actions = userActions.All;

export interface UserFeatureModel  {
    user: State;
  }


export interface State {
   currentUser: UserInformation;
  }

  const initialState: State = {
    currentUser: null
  };

  export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
      case userActions.GET_USER_INFORMATION: {
        return { ...state, currentUser: action.payload};
      }
        default:
        return state;
    }
}


export const reducers = {
    user: reducer,
  };

  export const selectUserState = createFeatureSelector<UserFeatureModel>('user');
  export const selectUserStatusState = createSelector(
    selectUserState,
    (state: UserFeatureModel) => state.user
  );

