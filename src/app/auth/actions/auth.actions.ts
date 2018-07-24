import { Action } from '@ngrx/store';
import { UserEmail } from '../models';

export const LOGIN_WITH_EMAIL = '[ Auth ] - Login with email';
export const LOGIN_WITH_GITHUB = '[ Auth ] - Login with github';
export const LOGIN_WITH_GOOGLE = '[ Auth ] - Login with google';
export const LOGIN_SUCCESS = '[ Auth ] - Login success';
export const LOGIN_FAILED = '[ Auth ] - Login Failed';

export class LoginWithEmail implements Action {
  readonly type = LOGIN_WITH_EMAIL;
  public constructor(public payload: UserEmail) {}
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
  public constructor(public payload) {}
}

export class LoginFailed implements Action {
  readonly type = LOGIN_FAILED;
  public constructor() {}
}

export type All =
  | LoginWithEmail
  | LoginWithGithub
  | LoginWithGoogle
  | LoginSuccess
  | LoginFailed;
