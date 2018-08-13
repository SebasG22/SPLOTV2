import { Action } from '@ngrx/store';
import { UserInformation } from '../models';

export const GET_USER_INFORMATION = '[ User ] - Get User Information';
export const GET_USER_INFORMATION_SUCCESS =
  '[ User ] - Get User Information Success';
export const GET_USER_INFORMATION_FAILED =
  '[ User ] - Get User Information Failed';

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

export type All =
  | GetUserInformation
  | GetUserInformationSuccess
  | GetUserInformationFailed;
