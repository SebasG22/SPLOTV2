import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Project } from '../../models';
import * as projectsAction from '../actions/projects.action';

export type Actions = projectsAction.All;

export interface ProjectFeatureModel {
    project: State;
}


export interface State {
    projects: Project[];
    projectSelected: Project;
}

const initialState: State = {
    projects: null,
    projectSelected: null,
};

export function reducer(state: State = initialState, action: Actions): State {

    switch (action.type) {
        default:
            return state;
    }
}


export const reducers = {
    auth: reducer,
};

export const selectProjectState = createFeatureSelector<ProjectFeatureModel>('ProjectFeatureModel');
export const selectProjectStatusState = createSelector(
    selectProjectState,
    (state: ProjectFeatureModel) => state.project
);
export const getProjects = createSelector(selectProjectStatusState, (state: State) => state.projects);
export const getProjectsSelected = createSelector(selectProjectStatusState, (state: State) => state.projectSelected);

