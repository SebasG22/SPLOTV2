import * as errorActions from '../actions/error.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export type Actions = errorActions.All;

export interface ErrorFeatureModel {
    error: State;
}

export interface State {
    title: string;
    message: string;
    devInfo: any;
}

export const initialState: State = {
    title: null,
    message: null,
    devInfo: null
};

export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
        case errorActions.SET_ERROR_SPLOT: {
            return { ...state, ...action.payload };
        }
        default:
            return state;
    }
}


export const reducers = {
    error: reducer,
};

export const selectErrorState = createFeatureSelector<ErrorFeatureModel>('ErrorFeatureModel');
export const selectErrorStatusState = createSelector(
    selectErrorState,
    (state: ErrorFeatureModel) => state.error);

export const getErrorMessage = createSelector(selectErrorStatusState, (state: State) => {
    const { title, message, devInfo } = state;
    return { title, message, devInfo };
});

