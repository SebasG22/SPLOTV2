import * as userActions from '../actions/users.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInformation } from '../models';
export type Actions = userActions.All;

export interface UserFeatureModel  {
    user: State;
  }

export interface State {
   currentUser: UserInformation;
   selectedUser: UserInformation;
  }

  const initialState: State = {
    currentUser: null ,
    selectedUser: null
  };

  export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
      case userActions.GET_USER_INFORMATION_SUCCESS:
      return { ...state, selectedUser: action.payload };
      case userActions.CHECK_USER_REGISTRATION_SUCCESS:
      case userActions.REGISTER_USER_SUCCESS:
      return { ...state, currentUser: action.payload};
        default:
        return state;
    }
}


export const reducers = {
    user: reducer,
  };

  export const selectUserState = createFeatureSelector<UserFeatureModel>('UserFeatureModel');
  export const selectUserStatusState = createSelector(
    selectUserState,
    (state: any) => state.user);
  export const getCurrentUserInformation =  createSelector(selectUserStatusState, (state: State) => state.currentUser);
  export const getSelectedUserInformation =  createSelector(selectUserStatusState, (state: State) => state.selectedUser);

