import { Action } from '@ngrx/store';
import { UserInformation, UserPermissionsConfig } from '../models';
import { UserProvider } from '../../auth/models';
import { User } from 'firebase';

export const CHECK_USER_REGISTRATION = '[ User ] - Check user registration';
export const CHECK_USER_REGISTRATION_SUCCESS = '[ User ] - Check user registration success';
export const CHECK_USER_REGISTRATION_FAILED = '[ User ] - Check user registration failed';

export const REGISTER_USER = '[ User ] - Register user';
export const REGISTER_USER_SUCCESS = '[ User ]- Register user success';
export const REGISTER_USER_FAILED = '[ USER ]- REGISTER USER FAILED';

export const GET_USER_INFORMATION = '[ USER ] - GET USER INFORMATION';
export const GET_USER_INFORMATION_SUCCESS =
  '[ USER ] - GET USER INFORMATION SUCCESS';
export const GET_USER_INFORMATION_FAILED =
  '[ USER ] - GET USER INFORMATION FAILED';

export const UPDATE_USER_INFORMATION = '[ USER ] - UPDATE USER INFORMATION';
export const UPDATE_USER_INFORMATION_SUCCESS = '[ USER ] - UPDATE USER INFORMATION SUCCESS';
export const UPDATE_USER_INFORMATION_FAILED = '[ USER ] - UPDATE USER INFORMATION FAILED';

export const UPDATE_USER_PERMISSIONS = '[ USER ] - UPDATE USER PERMISSIONS';
export const UPDATE_USER_PERMISSIONS_SUCCESS = '[ USER ] - UPDATE USER PERMISSIONS SUCCESS';
export const UPDATE_USER_PERMISSIONS_FAILED = '[ USER ] - UPDATE USER PERMISSIONS FAILED';

export const ADD_USER_HISTORY = '[ USER ] - ADD USER HISTORY';
export const ADD_USER_HISTORY_SUCCESS = '[ USER ] - ADD USER HISTORY SUCCESS';
export const ADD_USER_HISTORY_FAILED = '[ USER ] - ADD USER HISTORY failed';

export const FILTER_USERS = '[ USER ] - FILTER USERS';
export const FILTER_USERS_SUCCESS = '[ USER ] - FILTER USERS SUCCESS';
export const FILTER_USERS_FAILED = '[ USER ] - FILTER USERS FAILED';

export const GET_USERS_INFORMATION_BY_IDS = '[ USER ] - GET USERS INFORMATION BY IDS';
export const GET_USERS_INFORMATION_BY_IDS_SUCCESS = '[ USER ] - GET USERS INFORMATION BY IDS SUCCESS';
export const GET_USERS_INFORMATION_BY_IDS_FAILED = '[ USER ] - GET USERS INFORMATION BY IDS FAILED';

export const GET_USERS_INFORMATION = '[ USER ] - GET USERS INFORMATION';
export const GET_USERS_INFORMATION_SUCCESS = '[ USER ] - GET USERS INFORMATION SUCCESS';
export const GET_USERS_INFORMATION_FAILED = '[ USER ] - GET USERS INFORMATION FAILED';
export class RegisterUser implements Action {
  readonly type = REGISTER_USER;
  public constructor(public payload: UserProvider) { }
}

export class RegisterUserSuccess implements Action {
  readonly type = REGISTER_USER_SUCCESS;
  public constructor(public payload: UserInformation) { }
}

export class RegisterUserFailed implements Action {
  readonly type = REGISTER_USER_FAILED;
  public constructor() { }
}

export class CheckUserRegistration implements Action {
  readonly type = CHECK_USER_REGISTRATION;
  public constructor(public payload: any) { }
}

export class CheckUserRegistrationSuccess implements Action {
  readonly type = CHECK_USER_REGISTRATION_SUCCESS;
  public constructor(public payload: UserInformation) { }
}

export class CheckUserRegistrationFailed implements Action {
  readonly type = CHECK_USER_REGISTRATION_FAILED;
  public constructor() { }
}
export class GetUserInformation implements Action {
  readonly type = GET_USER_INFORMATION;
  public constructor(public payload: string) { }
}

export class GetUserInformationSuccess implements Action {
  readonly type = GET_USER_INFORMATION_SUCCESS;
  public constructor(public payload: UserInformation) { }
}

export class GetUserInformationFailed implements Action {
  readonly type = GET_USER_INFORMATION_FAILED;
  public constructor() { }
}

export class UpdateUserInformation implements Action {
  readonly type = UPDATE_USER_INFORMATION;
  public constructor(public payload: UserInformation) { }
}

export class UpdateUserInformationSuccess implements Action {
  readonly type = UPDATE_USER_INFORMATION_SUCCESS;
  public constructor() { }
}

export class UpdateUserInformationFailed implements Action {
  readonly type = UPDATE_USER_INFORMATION_FAILED;
  public constructor() { }
}

export class UpdateUserPermissions implements Action {
  readonly type = UPDATE_USER_PERMISSIONS;
  public constructor(public payload: UserPermissionsConfig) { }
}

export class UpdateUserPermissionsSuccess implements Action {
  readonly type = UPDATE_USER_PERMISSIONS_SUCCESS;
  public constructor() { }
}

export class UpdateUserPermissionsFailed implements Action {
  readonly type = UPDATE_USER_PERMISSIONS_FAILED;
  public constructor(public payload: string) { }
}

export class AddUserHistory implements Action {
  readonly type = ADD_USER_HISTORY;
  public constructor(public payload: string) { }
}

export class AddUserHistorySuccess implements Action {
  readonly type = ADD_USER_HISTORY_SUCCESS;
  public constructor() { }
}

export class AddUserHistoryFailed implements Action {
  readonly type = ADD_USER_HISTORY_FAILED;
  public constructor() { }
}

export class FilterUsers implements Action {
  readonly type = FILTER_USERS;
  public constructor(public payload: { search: string, searchBy: string, page: number }) { }
}

export class FilterUsersSuccess implements Action {
  readonly type = FILTER_USERS_SUCCESS;
  public constructor(public payload: any) { }
}

export class FilterUsersFailed implements Action {
  readonly type = FILTER_USERS_FAILED;
  public constructor(public payload: any) { }
}

export class GetUsersInformationByIds implements Action {
  readonly type = GET_USERS_INFORMATION_BY_IDS;
  public constructor(public payload: any) { }
}

export class GetUsersInformationByIdsSuccess implements Action {
  readonly type = GET_USERS_INFORMATION_BY_IDS_SUCCESS;
  public constructor(public payload: any) { }
}

export class GetUsersInformationByIdsFailed implements Action {
  readonly type = GET_USERS_INFORMATION_BY_IDS_FAILED;
  public constructor(public payload: any = null) { }
}

export class GetUsersInformation implements Action {
  readonly type = GET_USERS_INFORMATION;
  public constructor() {}
}

export class GetUsersInformationSuccess implements Action {
  readonly type = GET_USERS_INFORMATION_SUCCESS;
  public constructor(public payload: any) {}
}

export class GetUsersInformationFailed implements Action {
  readonly type = GET_USERS_INFORMATION_FAILED;
  public constructor() {}
}

export type All =
  | CheckUserRegistration
  | CheckUserRegistrationSuccess
  | CheckUserRegistrationFailed
  | RegisterUser
  | RegisterUserSuccess
  | RegisterUserFailed
  | GetUserInformation
  | GetUserInformationSuccess
  | GetUserInformationFailed
  | UpdateUserInformation
  | UpdateUserInformationSuccess
  | UpdateUserInformationFailed
  | UpdateUserPermissions
  | UpdateUserPermissionsSuccess
  | UpdateUserPermissionsFailed
  | FilterUsers
  | FilterUsersSuccess
  | FilterUsersFailed
  | GetUsersInformationByIds
  | GetUsersInformationByIdsSuccess
  | GetUsersInformationByIdsFailed
  | GetUsersInformation
  | GetUsersInformationSuccess
  | GetUsersInformationFailed;
