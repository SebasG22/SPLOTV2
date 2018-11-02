import * as configurationProcessActions from '../actions/configuration-process.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IConfigurationModel, IUserConfiguration } from '../models/configuration-process.model';
export type Actions = configurationProcessActions.All;

export interface ConfigurationProcessFeatureModel {
    cfgProcess: State;
}

export interface State {
    configurationsModels: IConfigurationModel[];
    userConfiguration: IUserConfiguration;
    loading: boolean;
}

export const initialState: State = {
    loading: false,
    configurationsModels: null,
    userConfiguration: null
};

export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
        case configurationProcessActions.GET_CONFIGURATION_MODELS_SUCCESS: {
            return { ...state, configurationsModels: action.payload };
        }
        case configurationProcessActions.GET_CHILDREN_CONFIGURATION_BY_LEVEL: {
            return { ...state, loading: true };
        }
        case configurationProcessActions.GET_CHILDREN_CONFIGURATION_BY_LEVEL_SUCCESS: {
            return { ...state, userConfiguration: action.payload };
        }

        default:
            return state;
    }
}


export const reducers = {
    cfgProcess: reducer,
};

export const selectConfigurationProcessState = createFeatureSelector<ConfigurationProcessFeatureModel>('ConfigurationProcessFeatureModel');
export const selectConfigurationProcessStatusState = createSelector(
    selectConfigurationProcessState,
    (state: ConfigurationProcessFeatureModel) => {
        console.log(state);
        return state.cfgProcess;
    }
);
export const getConfigurationModelsInformation =
    createSelector(selectConfigurationProcessStatusState, (state: State) => state.configurationsModels);

export const getLoader = createSelector(selectConfigurationProcessStatusState, (state: State) => state.loading);

export const getUserConfiguration = createSelector(selectConfigurationProcessStatusState, (state: State) => state.userConfiguration);
