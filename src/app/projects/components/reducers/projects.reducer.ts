import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProject } from '../../models';
import * as projectsAction from '../actions/projects.action';

export type Actions = projectsAction.All;

export interface ProjectFeatureModel {
    project: State;
}


export interface State {
    projects: IProject[];
    projectSelected: IProject;
}

const initialState: State = {
    projects: null,
    projectSelected: null,
};

export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
        case projectsAction.LIST_PROJECTS_SUCCESS:
            return { ...state, projects: action.payload };
        default:
            return state;
    }
}


export const reducers = reducer;

export const selectProjectState = createFeatureSelector<State>('ProjectFeatureModel');
export const getProjects = createSelector(selectProjectState, (state: State) => state.projects);
export const getProjectsSelected = createSelector(selectProjectState, (state: State) => state.projectSelected);

