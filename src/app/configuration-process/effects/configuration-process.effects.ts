import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import {
    GET_CONFIGURATION_MODELS,
    GetConfigurationModelsSuccess,
    GET_CHILDREN_CONFIGURATION_BY_LEVEL,
    GetChildrenByLevelSuccess
} from '../actions/configuration-process.actions';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { ConfigurationProcessService } from '../services/configuration-process.service';
import { IConfigurationModel, IUserConfiguration } from '../models/configuration-process.model';
import { getCurrentUserInformation } from 'src/app/users/reducers/users.reducer';
import { Store } from '@ngrx/store';

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
            withLatestFrom(this.store.select(getCurrentUserInformation)),
            switchMap(([payload, currentUser]) => {
                return this.configurationProcessService.
                    getConfigurationChildrenByLevel(payload.projectId, currentUser.id, payload.stepIndex);
            }),
            map((userModel: IUserConfiguration) => {
                return new GetChildrenByLevelSuccess(userModel);
            })
        );



    constructor(
        private actions$: Actions,
        private configurationProcessService: ConfigurationProcessService,
        private store: Store<{}>
    ) { }


}

