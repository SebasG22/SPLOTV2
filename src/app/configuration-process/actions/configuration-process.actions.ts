import { Action } from '@ngrx/store';
import { IConfigurationModel, IConfigurationChildrenParsed, IUserDecision } from '../models/configuration-process.model';

export const GET_CONFIGURATION_MODELS = '[ Configuration ] - Get configuration models';
export const GET_CONFIGURATION_MODELS_SUCCESS = '[ Configuration ] - Get configuration models success';
export const GET_CONFIGURATION_MODELS_FAILED = '[ Configuration ] - Get configuration models failed';

export const GET_CHILDREN_CONFIGURATION_BY_LEVEL = '[ Configuration ] - Get children by level';
export const GET_CHILDREN_CONFIGURATION_BY_LEVEL_SUCCESS = '[ Configuration ] - Get children by level success';
export const GET_CHILDREN_CONFIGURATION_BY_LEVEL_FAILED = '[ Configuration ] - Get children by level failed';
export const SAVE_USER_CONFIGURATION_DECISION = '[ Configuration ] - Save user configuration decision';
export const SAVE_USER_CONFIGURATION_DECISION_SUCCESS = '[ Configuration ] - Save user configuration decision success';
export const SAVE_USER_CONFIGURATION_DECISION_FAILED = '[ Configuration ] - Save user configuration decision failed';
export class GetConfigurationModels implements Action {
    readonly type = GET_CONFIGURATION_MODELS;
}
export class GetConfigurationModelsSuccess implements Action {
    readonly type = GET_CONFIGURATION_MODELS_SUCCESS;
    public constructor(public payload: IConfigurationModel[]) { }
}

export class GetConfigurationModelsFailed implements Action {
    readonly type = GET_CONFIGURATION_MODELS_FAILED;
    public constructor(public payload: string) { }
}

export class GetChildrenByLevel implements Action {
    readonly type = GET_CHILDREN_CONFIGURATION_BY_LEVEL;
    public constructor(public payload: number) { }
}

export class GetChildrenByLevelSuccess implements Action {
    readonly type = GET_CHILDREN_CONFIGURATION_BY_LEVEL_SUCCESS;
    public constructor(public payload: IConfigurationChildrenParsed) { }
}

export class GetChildrenByLevelFailed implements Action {
    readonly type = GET_CHILDREN_CONFIGURATION_BY_LEVEL_FAILED;
    public constructor(public payload: IConfigurationChildrenParsed) { }
}

export class SaveUserConfigurationDecision implements Action {
    readonly type = SAVE_USER_CONFIGURATION_DECISION;
    public constructor(public payload: IUserDecision) { }
}

export class SaveUserConfigurationDecisionSuccess implements Action {
    readonly type = SAVE_USER_CONFIGURATION_DECISION_SUCCESS;
    public constructor() { }
}

export class SaveUserConfigurationDecisionFailed implements Action {
    readonly type = SAVE_USER_CONFIGURATION_DECISION_FAILED;
    public constructor() { }
}

export type All = GetConfigurationModels |
    GetConfigurationModelsSuccess |
    GetConfigurationModelsFailed |
    GetChildrenByLevel |
    GetChildrenByLevelSuccess |
    GetChildrenByLevelFailed |
    SaveUserConfigurationDecision |
    SaveUserConfigurationDecisionSuccess |
    SaveUserConfigurationDecisionFailed;
