import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
    CREATE_PROJECT,
    CreateProjectSuccess,
    CreateProjectFailed,
    CREATE_PROJECT_FAILED,
    LIST_PROJECTS,
    ListProjectsSuccess,
    ListProjectsFailed,
    LIST_PROJECTS_FAILED,
    GET_PROJECT,
    GetProjectSuccess,
    GetProjectFailed,
    GET_PROJECT_FAILED
} from '../actions/projects.action';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ProjectService } from '../services/project.service';
import { IProject } from '../models';

@Injectable()
export class ProjectEffects {

    @Effect()
    createProject$ = this.actions$
        .ofType(CREATE_PROJECT)
        .pipe(
            map((action: any) => action.payload),
            switchMap((payload) => {
                return this.projectService.createProject(payload);
            }),
            map((response) => new CreateProjectSuccess(response)),
            catchError((error) => [new CreateProjectFailed(error)])
        );

    @Effect({ dispatch: false })
    createProjectFailed$ = this.actions$
        .ofType(CREATE_PROJECT_FAILED)
        .pipe(
            map((action: any) => console.error(action.payload))
        );

    @Effect()
    getProject$ = this.actions$
        .ofType(GET_PROJECT)
        .pipe(
            map((action: any) => action.payload),
            switchMap((payload) => {
                return this.projectService.getProject(payload);
            }),
            map((response: IProject) => new GetProjectSuccess(response)),
            catchError((error) => [new GetProjectFailed(error)])
        );

    @Effect({ dispatch: false })
    getProjectFailed$ = this.actions$
        .ofType(GET_PROJECT_FAILED)
        .pipe(
            map((action: any) => console.error(action.payload))
        );

    @Effect()
    listProjects$ = this.actions$
        .ofType(LIST_PROJECTS)
        .pipe(
            switchMap(() => {
                return this.projectService.getProjects();
            }),
            map((response) => new ListProjectsSuccess(response)),
            catchError((error) => [new ListProjectsFailed(error)])
        );

    @Effect({ dispatch: false })
    listProjectsFailed$ = this.actions$
        .ofType(LIST_PROJECTS_FAILED)
        .pipe(
            map((action: any) => console.error(action.payload))
        );

    constructor(
        private actions$: Actions,
        private projectService: ProjectService
    ) {

    }
}
