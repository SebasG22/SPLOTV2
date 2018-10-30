import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProject } from '../models';
import * as projectsAction from '../actions/projects.action';
import { IConfigurationModel } from 'src/app/configuration-process/models/configuration-process.model';

export type Actions = projectsAction.All;

export interface ProjectFeatureModel {
    project: State;
}


export interface State {
    projects: IProject[];
    projectSelected: IProject;
    configurationModels: IConfigurationModel;
}

const initialState: State = {
    projects: null,
    projectSelected: null,
    configurationModels: null
};

export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
        case projectsAction.GET_PROJECT_SUCCESS:
            return { ...state, projectSelected: action.payload };
        case projectsAction.LIST_PROJECTS_SUCCESS:
            return { ...state, projects: action.payload };
        default:
            return state;
    }
}


export const reducers = reducer;

export const selectProjectState = createFeatureSelector<State>('ProjectFeatureModel');
export const getProjects = createSelector(selectProjectState, (state: State) => state.projects);
export const getProjectSelected = createSelector(selectProjectState, (state: State) => state.projectSelected);

