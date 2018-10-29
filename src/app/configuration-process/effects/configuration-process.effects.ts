import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { GET_CONFIGURATION_MODELS, GetConfigurationModelsSuccess } from '../actions/configuration-process.actions';
import { switchMap, map } from 'rxjs/operators';
import { ConfigurationProcessService } from '../services/configuration-process.service';
import { IConfigurationModel } from '../models/configuration-process.model';

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



    constructor(
        private actions$: Actions,
        private configurationProcessService: ConfigurationProcessService
    ) { }


}

