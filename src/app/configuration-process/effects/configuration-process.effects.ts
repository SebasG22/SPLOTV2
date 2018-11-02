import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {
    GET_CONFIGURATION_MODELS,
    GetConfigurationModelsSuccess,
    GET_CHILDREN_CONFIGURATION_BY_LEVEL,
    GetChildrenByLevelSuccess
} from '../actions/configuration-process.actions';
import { switchMap, map } from 'rxjs/operators';
import { ConfigurationProcessService } from '../services/configuration-process.service';
import { IConfigurationModel, IUserConfiguration } from '../models/configuration-process.model';

@Injectable()
export class ConfigurationProcessEffects {


    @Effect({ dispatch: true })
    getConfigurationModels$ = this.actions$.ofType(GET_CONFIGURATION_MODELS).pipe(
        switchMap(() =>
            this.configurationProcessService.getModels()
        ),
        map((models: IConfigurationModel[]) => {
            return new GetConfigurationModelsSuccess(models);
        })
    );

    @Effect()
    getChildrenByLevel$ = this.actions$.ofType(GET_CHILDREN_CONFIGURATION_BY_LEVEL)
        .pipe(
            map((event: any) => event.payload),
            switchMap((payload) => {
                return this.configurationProcessService.
                    getConfigurationChildrenByLevel(payload.projectId, payload.userId, payload.stepIndex);
            }),
            map((userModel: IUserConfiguration) => {
                return new GetChildrenByLevelSuccess(userModel);
            })
        );



    constructor(
        private actions$: Actions,
        private configurationProcessService: ConfigurationProcessService
    ) { }


}

