import { Action } from '@ngrx/store';
import { Project } from '../../models';

export const CREATE_PROJECT = '[ Projects ] - Create Project';
export const CREATE_PROJECT_SUCCESS = '[ Projects ] - Create Project Success';
export const CREATE_PROJECT_FAILED = '[ Projects ] - Create Project Failed';

export const GET_PROJECT = '[ Projects ] - Get Project';
export const GET_PROJECT_SUCCESS = '[ Projects ] - Get Project Success';
export const GET_PROJECT_FAILED = '[ Projects ] - Get Project Failed';

export const UPDATE_PROJECT = '[ Projects ] - Update Project';
export const UPDATE_PROJECT_SUCCESS = '[ Projects ] - Update Project Success';
export const UPDATE_PROJECT_FAILED = '[ Projects ] - Update Project Failed';

export const GET_PROJECTS = '[ Projects ] - Get Projects';
export const GET_PROJECTS_SUCCESS = '[ Projects ] - Get Projects Success';
export const GET_PROJECTS_FAILED = '[ Projects ] - Get Projects Failed';


export class CreateProject implements Action {
    readonly type = CREATE_PROJECT;
    constructor(public payload: Project) { }
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
    constructor(public payload: Project) { }
}

export class GetProjectFailed implements Action {
    readonly type = GET_PROJECT_FAILED;
    constructor(public payload: any = null) { }
}

export class UpdateProject implements Action {
    readonly type = UPDATE_PROJECT;
    constructor(public payload: Project) { }
}

export class UpdateProjectSuccess implements Action {
    readonly type = UPDATE_PROJECT_SUCCESS;
    constructor(public payload: any = null) { }
}

export class UpdateProjectFailed implements Action {
    readonly type = UPDATE_PROJECT_FAILED;
    constructor(public payload: any = null) { }
}

export class GetProjects implements Action {
    readonly type = GET_PROJECTS;
    constructor(public payload: any = null) { }
}

export class GetProjectsSuccess implements Action {
    readonly type = GET_PROJECTS_SUCCESS;
    constructor(public payload: Project[]) { }
}

export class GetProjectsFailed implements Action {
    readonly type = GET_PROJECTS_FAILED;
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
    GetProjects |
    GetProjectsSuccess |
    GetProjectsFailed;
