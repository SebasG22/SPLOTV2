import { Action } from '@ngrx/store';
import { UserInformation } from '../models';
import { UserProvider } from '../../auth/models';

export const CHECK_USER_REGISTRATION = '[ User ] - Check user registration';
export const CHECK_USER_REGISTRATION_SUCCESS = '[ User ] - Check user registration success';
export const CHECK_USER_REGISTRATION_FAILED = '[ User ] - Check user registration failed';
export const REGISTER_USER = '[ User ] - Register user';
export const REGISTER_USER_SUCCESS = '[ User ]- Register user success';
export const REGISTER_USER_FAILED = '[ User ]- Register user failed';
export const GET_USER_INFORMATION = '[ User ] - Get user information';
export const GET_USER_INFORMATION_SUCCESS =
  '[ User ] - Get User Information Success';
export const GET_USER_INFORMATION_FAILED =
  '[ User ] - Get User Information Failed';
export const UPDATE_USER_INFORMATION = '[ User ] - Update user information';
export const UPDATE_USER_INFORMATION_SUCCESS = '[ User ] - Update user information success';
export const UPDATE_USER_INFORMATION_FAILED = '[ User ] - Update user information failed';
export const ADD_USER_HISTORY = '[ User ] - Add user history';
export const ADD_USER_HISTORY_SUCCESS = '[ User ] - Add user history success';
export const ADD_USER_HISTORY_FAILED = '[ User ] - Add user history failed';
  export class RegisterUser implements Action {
    readonly type = REGISTER_USER;
    public constructor(public payload: UserProvider) {}
  }

  export class RegisterUserSuccess implements Action {
    readonly type = REGISTER_USER_SUCCESS;
    public constructor(public payload: UserInformation) {}
  }

  export class RegisterUserFailed implements Action {
    readonly type = REGISTER_USER_FAILED;
    public constructor() {}
  }

  export class CheckUserRegistration implements Action {
    readonly type = CHECK_USER_REGISTRATION;
    public constructor(public payload: UserInformation) {}
  }

  export class CheckUserRegistrationSuccess implements Action {
    readonly type = CHECK_USER_REGISTRATION_SUCCESS;
    public constructor(public payload: UserInformation) {}
  }

  export class CheckUserRegistrationFailed implements Action {
    readonly type = CHECK_USER_REGISTRATION_FAILED;
    public constructor() {}
  }
  export class GetUserInformation implements Action {
  readonly type = GET_USER_INFORMATION;
  public constructor(public payload: UserInformation) {}
}

export class GetUserInformationSuccess implements Action {
  readonly type = GET_USER_INFORMATION_SUCCESS;
  public constructor() {}
}

export class GetUserInformationFailed implements Action {
  readonly type = GET_USER_INFORMATION_FAILED;
  public constructor() {}
}

export class UpdateUserInformation implements Action {
  readonly type = UPDATE_USER_INFORMATION;
  public constructor(public payload: UserInformation) {}
}

export class UpdateUserInformationSuccess implements Action {
  readonly type = UPDATE_USER_INFORMATION_SUCCESS;
  public constructor() {}
}

export class UpdateUserInformationFailed implements Action {
  readonly type = UPDATE_USER_INFORMATION_FAILED;
  public constructor() {}
}

export class AddUserHistory implements Action {
  readonly type = ADD_USER_HISTORY;
  public constructor(public payload: string) {}
}

export class AddUserHistorySuccess implements Action {
  readonly type = ADD_USER_HISTORY_SUCCESS;
  public constructor() {}
}

export class AddUserHistoryFailed implements Action {
  readonly type = ADD_USER_HISTORY_FAILED;
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
  | UpdateUserInformationFailed;
