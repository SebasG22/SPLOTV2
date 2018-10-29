import * as configurationProcessActions from '../actions/configuration-process.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IConfigurationModel } from 'src/app/projects/models';
export type Actions = configurationProcessActions.All;

export interface ConfigurationProcessFeatureModel {
    cfgProcess: State;
}

export interface State {
    configurationsModels: IConfigurationModel[];
}

export const initialState: State = {
    configurationsModels: null
};

export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
        case configurationProcessActions.GET_CONFIGURATION_MODELS_SUCCESS: {
            return { ...state, configurationsModels: action.payload };
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
    (state: ConfigurationProcessFeatureModel) => state.cfgProcess
);
export const getConfigurationModelsInformation =
    createSelector(selectConfigurationProcessStatusState, (state: State) => state.configurationsModels);

