import { Action } from '@ngrx/store';
import { IProject } from '../../models';

export const CREATE_PROJECT = '[ Projects ] - Create Project';
export const CREATE_PROJECT_SUCCESS = '[ Projects ] - Create Project Success';
export const CREATE_PROJECT_FAILED = '[ Projects ] - Create Project Failed';

export const GET_PROJECT = '[ Projects ] - Get Project';
export const GET_PROJECT_SUCCESS = '[ Projects ] - Get Project Success';
export const GET_PROJECT_FAILED = '[ Projects ] - Get Project Failed';

export const UPDATE_PROJECT = '[ Projects ] - Update Project';
export const UPDATE_PROJECT_SUCCESS = '[ Projects ] - Update Project Success';
export const UPDATE_PROJECT_FAILED = '[ Projects ] - Update Project Failed';

export const LIST_PROJECTS = '[ Projects ] - List Projects';
export const LIST_PROJECTS_SUCCESS = '[ Projects ] - List Projects Success';
export const LIST_PROJECTS_FAILED = '[ Projects ] - List Projects Failed';


export class CreateProject implements Action {
    readonly type = CREATE_PROJECT;
    constructor(public payload: IProject) { }
}

export class CreateProjectSuccess implements Action {
    readonly type = CREATE_PROJECT_SUCCESS;
    constructor(public payload = null) { }
}

export class CreateProjectFailed implements Action {
    readonly type = CREATE_PROJECT_FAILED;
    constructor(public payload = null) { }
}

export class GetProject implements Action {
    readonly type = GET_PROJECT;
    constructor(public payload: string) { }
}

export class GetProjectSuccess implements Action {
    readonly type = GET_PROJECT_SUCCESS;
    constructor(public payload: IProject) { }
}

export class GetProjectFailed implements Action {
    readonly type = GET_PROJECT_FAILED;
    constructor(public payload: any = null) { }
}

export class UpdateProject implements Action {
    readonly type = UPDATE_PROJECT;
    constructor(public payload: IProject) { }
}

export class UpdateProjectSuccess implements Action {
    readonly type = UPDATE_PROJECT_SUCCESS;
    constructor(public payload: any = null) { }
}

export class UpdateProjectFailed implements Action {
    readonly type = UPDATE_PROJECT_FAILED;
    constructor(public payload: any = null) { }
}

export class ListProjects implements Action {
    readonly type = LIST_PROJECTS;
    constructor(public payload: any = null) { }
}

export class ListProjectsSuccess implements Action {
    readonly type = LIST_PROJECTS_SUCCESS;
    constructor(public payload: IProject[]) { }
}

export class ListProjectsFailed implements Action {
    readonly type = LIST_PROJECTS_FAILED;
    constructor(public payload: any = null) { }
}

export type All = CreateProject |
    CreateProjectSuccess |
    CreateProjectFailed |
    GetProject |
    GetProjectSuccess |
    GetProjectFailed |
    UpdateProject |
    UpdateProjectSuccess |
    UpdateProjectFailed |
    ListProjects |
    ListProjectsSuccess |
    ListProjectsFailed;
