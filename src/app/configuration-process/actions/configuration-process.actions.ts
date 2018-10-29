import { Action } from '@ngrx/store';
import { IConfigurationModel } from 'src/app/projects/models';

export const GET_CONFIGURATION_MODELS = '[ Configuration ] - Get configuration models';
export const GET_CONFIGURATION_MODELS_SUCCESS = '[ Configuration ] - Get configuration models success';
export const GET_CONFIGURATION_MODELS_FAILED = '[ Configuration ] - Get configuration models failed';

export class GetConfigurationModels implements Action {
    readonly type = GET_CONFIGURATION_MODELS;
    public constructor() { }
}

export class GetConfigurationModelsSuccess implements Action {
    readonly type = GET_CONFIGURATION_MODELS_SUCCESS;
    public constructor(public payload: IConfigurationModel[]) { }
}

export class GetConfigurationModelsFailed implements Action {
    readonly type = GET_CONFIGURATION_MODELS_FAILED;
    public constructor(public payload: string) { }
}

export type All = GetConfigurationModels |
    GetConfigurationModelsSuccess |
    GetConfigurationModelsFailed;
