import * as userActions from '../actions/users.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInformation } from '../models';
export type Actions = userActions.All;

export interface UserFeatureModel {
  user: State;
}

export interface State {
  currentUser: UserInformation;
  selectedUser: UserInformation;
  loading_data: boolean;
  usersList: any[];
}

const initialState: State = {
  currentUser: null,
  selectedUser: null,
  loading_data: false,
  usersList: null
};

export function reducer(state: State = initialState, action: Actions): State {

  switch (action.type) {
    case userActions.GET_USER_INFORMATION_SUCCESS:
      return { ...state, selectedUser: action.payload };
    case userActions.CHECK_USER_REGISTRATION_SUCCESS:
    case userActions.REGISTER_USER_SUCCESS:
      return { ...state, currentUser: action.payload };
    case userActions.FILTER_USERS:
    case userActions.FILTER_USERS_FAILED: {
      return { ...state, usersList: null, loading_data: true, };
    }
    case userActions.FILTER_USERS_SUCCESS:
      return { ...state, usersList: action.payload, loading_data: false };
    default:
      return state;
  }
}


export const reducers = {
  user: reducer,
};

export const selectUserState = createFeatureSelector<UserFeatureModel>('UserFeatureModel');
export const selectUserStatusState = createSelector(selectUserState, (state: any) => state.user);
export const getCurrentUserInformation = createSelector(selectUserStatusState, (state: State) => state.currentUser);
export const getSelectedUserInformation = createSelector(selectUserStatusState, (state: State) => state.selectedUser);
export const getUsersList = createSelector(selectUserStatusState, (state: State) => state.usersList);
export const getLoadingData = createSelector(selectUserStatusState, (state: State) => state.loading_data);
