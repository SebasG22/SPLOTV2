import { AuthEmail } from '../models';
import { Action } from '@ngrx/store';
import { UserInformation } from '../../users/models';

export const VERIFY_AUTH = '[ Auth ] - Verify Auth';
export const VERIFY_AUTH_SUCCESS = '[ Auth ] - Verify Auth Success';
export const LOGIN_WITH_EMAIL = '[ Auth ] - Login with email';
export const LOGIN_WITH_GITHUB = '[ Auth ] - Login with github';
export const LOGIN_WITH_GOOGLE = '[ Auth ] - Login with google';
export const LOGIN_SUCCESS = '[ Auth ] - Login success';
export const LOGIN_FAILED = '[ Auth ] - Login Failed';
export const LOGOUT = '[ Auth ] - Logout';
export const LOGOUT_SUCCESS = '[ Auth ] - Logout Success';
export const LOGOUT_FAILED = '[ Auth ] - Logout Failed';

export class VerifyAuth implements Action {
  readonly type = VERIFY_AUTH;
  public constructor () {}
}

export class VerifyAuthSuccess implements Action {
  readonly type = VERIFY_AUTH_SUCCESS;
  public constructor () {}
}
export class LoginWithEmail implements Action {
  readonly type = LOGIN_WITH_EMAIL;
  public constructor(public payload: AuthEmail) {}
}

export class LoginWithGithub implements Action {
  readonly type = LOGIN_WITH_GITHUB;
  public constructor() {}
}

export class LoginWithGoogle implements Action {
  readonly type = LOGIN_WITH_GOOGLE;
  public constructor() {}
}

export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  public constructor(public payload: UserInformation) {}
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  public constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
  public constructor() {}
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  public constructor() {}
}

export class LogoutFailed implements Action {
  readonly type = LOGOUT_FAILED;
  public constructor() {}
}

export type All =
  | VerifyAuth
  | VerifyAuthSuccess
  | LoginWithEmail
  | LoginWithGithub
  | LoginWithGoogle
  | LoginSuccess
  | LoginFailed
  | Logout
  | LogoutSuccess
  | LogoutFailed;
