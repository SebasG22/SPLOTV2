import { Action } from '@ngrx/store';
import { AppPermissions } from './users/models';

export const GET_APP_PERMISSIONS = '[ App ] - Get app permissions';
export const GET_APP_PERMISSIONS_SUCCESS = '[ App ] - Get app permissions success';
export const GET_APP_PERMISSIONS_FAILED = '[ App ] - Get app permissions failed';

export class GetAppPermissions implements Action {
    readonly type = GET_APP_PERMISSIONS;
    public constructor() {}
}

export class GetAppPermisionsSuccess implements Action {
    readonly type = GET_APP_PERMISSIONS_SUCCESS;
    public constructor(public payload: AppPermissions[]) {}
}

export class GetAppPermissionsFailed implements Action {
    readonly type = GET_APP_PERMISSIONS_FAILED;
    public constructor() {}
}

export type All = GetAppPermissions |
                  GetAppPermisionsSuccess |
                  GetAppPermissionsFailed;
