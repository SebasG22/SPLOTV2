import { Action } from '@ngrx/store';

import { AuthEmail, UserProvider } from '../models';

export const CHECK_AUTH_SESSION = '[Auth] - Check Auth Session';
export const CHECK_AUTH_SESSION_SUCCESS = '[Auth] - Check Auth Session';

export const LOGIN_WITH_GOOGLE = '[ Auth ] - Login with google';
export const LOGIN_WITH_EMAIL = '[Auth] - Login with email';
export const LOGIN_WITH_GITHUB = '[ Auth ] - Login with github';

export const LOGIN_SUCCESS = '[ Auth ] - Login success';
export const LOGIN_FAILED = '[ Auth ] - Login failed';

export const LOGOUT = '[ Auth ] - Logout';
export const LOGOUT_SUCCESS = '[ Auth ] - Logout success';
export const LOGOUT_FAILED = '[ Auth ] - Logout failed';

export const SET_AUTH_STATE = '[ Auth ] - Set auth state';

export class CheckAuthSession implements Action {
  readonly type = CHECK_AUTH_SESSION;
}

export class CheckAuthSessionSuccess implements Action {
  readonly type = CHECK_AUTH_SESSION_SUCCESS;
  constructor() { }
}

export class LoginWithGoogle implements Action {
  readonly type = LOGIN_WITH_GOOGLE;
  public constructor() { }
}
export class LoginWithEmail implements Action {
  readonly type = LOGIN_WITH_EMAIL;
  public constructor(public payload: AuthEmail) { }
}

export class LoginWithGithub implements Action {
  readonly type = LOGIN_WITH_GITHUB;
  public constructor() { }
}
export class LoginSuccess implements Action {
  readonly type = LOGIN_SUCCESS;
  public constructor() { }
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  public constructor(public payload: any) { }
}

export class Logout implements Action {
  readonly type = LOGOUT;
  public constructor() { }
}

export class LogoutSuccess implements Action {
  readonly type = LOGOUT_SUCCESS;
  public constructor() { }
}

export class LogoutFailed implements Action {
  readonly type = LOGOUT_FAILED;
  public constructor(public payload: any) { }
}

export type All =
  | LoginWithEmail
  | LoginWithGithub
  | LoginWithGoogle
  | LoginSuccess
  | LoginFailed
  | Logout
  | LogoutSuccess
  | LogoutFailed;
